require("dotenv").config();
const fs = require("fs");
const { MongoClient } = require("mongodb");

const connectionString = process.env.DATABASE_CONNECTION_STRING;
const client = new MongoClient(connectionString);

async function run() {
  try {
    await client.connect();
    const db = client.db("YelpBusinessData");
    const coll = db.collection("businessTrainedRaw");

    // Read the entire file content
    const fileContent = fs.readFileSync("./data/BusinessRawJSON.json", "utf8");
    const data = JSON.parse(fileContent);


    const businessesArray = Object.keys(data)
      .filter((key) => data[key].neighboringBusiness) // Only include businesses with neighboringBusinesses
      .map((key) => {
        const business = data[key];
        return {
          _id: key, // Store the key as _id
          businessId: business.id, // Change business.id to business.businessId
          ...business,
        };
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
