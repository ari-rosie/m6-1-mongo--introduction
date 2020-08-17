const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercice_1");

  const data = await db.collection("users").find().toArray();
  console.log(data);

  data ? res.status(200).json(data) : res.status(404).json("Data not found.");

  client.close();
};

module.exports = { getUsers };
