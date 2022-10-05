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

    req.send('todo')
}


module.exports = {
    postTrip,

  };
  