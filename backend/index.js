const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const port = 4000;

express()

  .use(helmet())
  .use(morgan("tiny"))
  .use(express.json())

  .get("/", (req, res) => {
    res.status(200).json({status:200, message: 'Hello World'});
  })

  .get('/test', (req,res) => {
    res.status(200).json({message: 'test'})
  })

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
