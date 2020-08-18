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

const getGreetingArray = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercice_1");

    const greetings = await db.collection("greetings").find().toArray();
    if (greetings) {
      let start = 0;
      let end = start + 25;
      if (req.query.start && req.query.start <= greetings.length)
        start = req.query.start;
      if (req.query.end) end = req.query.end;

      const limitedArray = greetings.slice(start, end);
      res.status(200).json({ status: 200, data: limitedArray });
    } else res.status(404).json({ status: 500, message: "Not found!" });
    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
    console.log(error.stack);
  }
};

const deleteGreeting = async (req, res) => {
  const _id = req.params._id;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("exercice_1");

    const d = await db.collection("greetings").deleteOne({ _id: _id });
    res.status(200).json(d.deletedCount);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
    console.log(error.stack);
  }
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetingArray,
  deleteGreeting,
};
