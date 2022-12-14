"use strict";

//MongoDB Setup
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };


//Get my profile, includes private info. Didn't ever implement much private info. Only email at this point
const getProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const myId = ObjectId(req.params.myId);

  try {
    await client.connect();
    const db = client.db("db-name");
    const result = await db.collection("users").find({ _id: myId }).toArray();

    const profile = {
      _id: result[0]._id,
      email: result[0].email,
      username: result[0].username,
      location: result[0].location,
    };


    res.status(200).json({ status: 200, data: profile });
  } catch (error) {
    res.status(500).json({ status: 500, Error: error });
  }

  client.close();
};

//Get other Profiles, only public info
const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const userId = ObjectId(req.params.user);
  
    try {
      await client.connect();
      const db = client.db("db-name");
      const result = await db.collection("users").find({ _id: userId }).toArray();
      
      const user = {
        username: result[0].username,
        location: result[0].location,
      };
  
      res.status(200).json({ status: 200, data: user });
    } catch (error) {
      res.status(500).json({ status: 500, Error: error });
    }
  
    client.close();
  };
  

module.exports = {
  getProfile,
  getUser,
};
