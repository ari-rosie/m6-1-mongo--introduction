const assert = require("assert");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  const greeting = req.body;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercice_1");

    const r = await db.collection("greetings").insertOne(greeting);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
    console.log(error.stack);
  }

  client.close();
};

const getGreeting = async (req, res) => {
  const _id = req.params._id;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercice_1");

    await db.collection("greetings").findOne({ _id }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: err });
      client.close();
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
    console.log(error.stack);
  }
};

module.exports = { createGreeting, getGreeting };
