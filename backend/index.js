const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const port = 4000;

express()
  .use(helmet())
  .use(morgan("tiny"))

  .get("/", (req, res) => {
    res.send("Hello World!");
  })

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
