"use strict";

//MongoDB Setup
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

//200 OK
//201 Created
//400 Bad request
//404 not found
//500 server error

const postTrip = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const trip = req.body;

  try {
    await client.connect();
    const db = client.db("db-name");
    const result = await db.collection("trips").insertOne(trip);    
    res.status(201).json({ status: 201, data: result })
  } catch (e) {
    res.status(500).json({ status: 500, Error: e });
  }

  client.close();

};

module.exports = {
  postTrip,
};
