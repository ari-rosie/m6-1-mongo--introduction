const fs = require("file-system");
const assert = require("assert");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  // const greeting = req.body;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("exercice_1");

  try {
    console.log(greetings.length);
    const r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
    console.log("greetings added");
    //   res.status(201).json({ status: 201, data: req.body, message: "greetings added" });
  } catch (error) {
    //   res
    //     .status(500)
    //     .json({ status: 500, data: req.body, message: error.message });
    console.log("Did not insert");
    console.log(error);
  }

  client.close();
};

batchImport();
