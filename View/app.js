"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const path = require("path");

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/vote", (req, res) => {
  const poll = {
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
  };

  res.sendFile(__dirname + "/vote.html", { poll: poll });
});
app.listen(port, function () {
  console.log(`server is running on port ${port}.`);
});
