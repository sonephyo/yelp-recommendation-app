const { MongoClient } = require("mongodb");
const fs = require("fs").promises; // Use fs.promises for async/await

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://129.3.20.3:27020/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("YelpBusinessData");
    const coll = db.collection("businessInfo");

    // Read the file asynchronously
    const data = await fs.readFile("../backend/src/main/java/data/BusinessNameLocationArrayJSON", "utf8");
    const businessesObject = JSON.parse(data);
    
    // Insert the data into the collection
    const result = await coll.insertMany(businessesObject);
    console.log(result.insertedIds);

  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

/**
 * Reading from rawBusiness and storing into the MongoDB
 */
// const fs = require('fs');
// const readline = require('readline');
// const { MongoClient } = require('mongodb');

// const uri = "mongodb://129.3.20.3:27020/";
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     const db = client.db("YelpBusinessData");
//     const coll = db.collection("businessRaw");

//     // Create a readable stream from the file
//     const fileStream = fs.createReadStream('../../yelp_dataset/business.json');
    
//     // Create an interface to read the file line by line
//     const rl = readline.createInterface({
//       input: fileStream,
//       crlfDelay: Infinity // Handle CRLF (Windows) and LF (Unix) line endings
//     });

//     const businessesArray = [];

//     count = 0;
//     // Process each line
//     for await (const line of rl) {
//       try {
//         // Parse the JSON object from the line
//         const jsonObject = JSON.parse(line);
//         businessesArray.push(jsonObject);
//         count++;
//         if (count % 100 == 0) {
//           console.log(count)
//         }
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//       }
//     }

//     // Insert the data into the collection
//     const result = await coll.insertMany(businessesArray);
//     console.log(result.insertedIds);

//   } catch (err) {
//     console.error("Error occurred:", err);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);
