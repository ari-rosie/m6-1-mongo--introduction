const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const newUser = req.body;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercice_1");

  await db.collection("users").insertOne(newUser);
  res.status(201).json();

  client.close();
};

module.exports = { addUser };
