require('dotenv').config();
const fs = require('fs');
const { MongoClient } = require('mongodb');

const connectionString = process.env.DATABASE_CONNECTION_STRING;
const client = new MongoClient(connectionString);

async function run() {
  try {
    await client.connect();
    const db = client.db("YelpBusinessData");
    const coll = db.collection("businessNameLocation");

    // Read the entire file content
    const fileContent = fs.readFileSync('./data/BusinessNameLocationArrayJSON.json', 'utf8');
    // Parse the file content. Since it's an array of objects, data is an array.
    const data = JSON.parse(fileContent);

    // Optional: If you want to use the 'id' field as MongoDB's _id,
    // map over the array and assign _id for each document.
    const documents = data.map(doc => {
      // Uncomment the following line to use the id as the _id:
      // doc._id = doc.id;
      return doc;
    });

    // Insert the array of documents into the collection
    const result = await coll.insertMany(documents);
    console.log("Inserted document IDs:", result.insertedIds);

  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
