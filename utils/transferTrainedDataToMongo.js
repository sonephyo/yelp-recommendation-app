require('dotenv').config();
const fs = require('fs');
const { MongoClient } = require('mongodb');

const connectionString = process.env.DATABASE_CONNECTION_STRING;
const client = new MongoClient(connectionString);

async function run() {
  try {
    await client.connect();
    const db = client.db("YelpBusinessData");
    const coll = db.collection("businessTrainedRaw");

    // Read the entire file content
    const fileContent = fs.readFileSync('./data/BusinessRawJSON.json', 'utf8');
    const data = JSON.parse(fileContent);

    // Convert the object into an array of documents.
    // Optionally, you can store the key as _id for each document.
    const businessesArray = Object.keys(data).map(key => {
      const business = data[key];
      // Uncomment the following line to use the key as the document's _id:
      // business._id = key;
      return business;
    });

    // Insert the array of documents into the collection
    const result = await coll.insertMany(businessesArray);
    console.log("Inserted document IDs:", result.insertedIds);

  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
