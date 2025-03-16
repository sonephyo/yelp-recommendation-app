require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient, GridFSBucket } = require('mongodb');

const connectionString = process.env.DATABASE_CONNECTION_STRING;
const client = new MongoClient(connectionString);

async function run() {
  try {
    await client.connect();
    const db = client.db("YelpBusinessData");

    // Create a GridFSBucket instance (using bucket name 'images')
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    
    // Folder that contains your images
    const imagesFolder = path.join(__dirname, 'images');
    const files = fs.readdirSync(imagesFolder);
    
    for (const file of files) {
      // Only process .jpg files
      if (path.extname(file).toLowerCase() !== '.jpg') continue;
      
      // Extract businessId from the file name (remove the '.jpg' extension)
      const businessId = path.basename(file, '.jpg');
      const filePath = path.join(imagesFolder, file);
      
      // Create a read stream for the image file
      const readStream = fs.createReadStream(filePath);
      
      // Upload the image to GridFS with metadata including businessId
      const uploadStream = bucket.openUploadStream(file, {
        metadata: { businessId }
      });
      
      // Pipe the file into GridFS
      readStream.pipe(uploadStream);
      
      // Wait for the upload to finish before proceeding to the next file
      await new Promise((resolve, reject) => {
        uploadStream.on('finish', () => {
          console.log(`Uploaded ${file} with businessId: ${businessId}`);
          resolve();
        });
        uploadStream.on('error', (err) => {
          console.error(`Error uploading ${file}:`, err);
          reject(err);
        });
      });
    }
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
