const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB_url;
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("MongoDB Connected!💥");
  } catch (err) {
    console.log(err);
  }
})();

const db = client.db(process.env.MONGODB_database);
module.exports = db;
