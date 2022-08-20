"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
const port = 3000;

const path = require("path");

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("creation");
});

// parse request body to suitable object
function parseBody(body) {
  const question = body.question;
  delete body.question;
  const options = Object.values(body).filter((element) => {
    return element !== "";
  });

  return { question, options };
}

// create new poll
app.post("/vote", (req, res) => {
  const poll = parseBody(req.body);
  let formString = `question=${poll.question}&options=${JSON.stringify(poll.options)}`;
  // console.log(formString);
  axios
    .post('http://localhost:8000/create_poll', formString)
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      let id = response.data;
      console.log(id);
      res.redirect("/vote/" + id);
    })
    .catch(error => {
      console.error(error);
      res.redirect("/error");
    });

});

// get poll details for vote page
app.get("/vote/:paramName", (req, res) => {
  const id = req.params.paramName;
  axios
    .get(`http://localhost:8000/vote/${id}`)
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      let poll = response.data;
      console.log(poll);
      poll.options = JSON.parse(poll.options);
      poll.id = id;
      res.render("vote", { poll });
    })
    .catch(error => {
      console.error(error);
      res.redirect("/error");
    });
});

// calculate and update results
app.post("/results", (req, res) => {
  const id = req.body.id;
  const order = "[" + req.body.order.toString() + "]";

  let formString = `order=${order}`;
  console.log(formString);
  axios
    .post(`http://localhost:8000/add_vote/${id}`, formString)
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      res.redirect("/vote/" + id + "/r");
    })
    .catch(error => {
      // console.error(error);
      res.redirect("/error");
    });
});

// get result data
app.get("/vote/:paramName/r", (req, res) => {
  const id = req.params.paramName;
  axios
    .get(`http://localhost:8000/vote/${id}/r`)
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      let poll = response.data;
      poll.id = id;
      poll.options = JSON.parse(poll.options);
      poll.rankings = JSON.parse(poll.rankings);
      console.log(poll);
      res.render("results", { poll });
    })
    .catch(error => {
      // console.error(error);
      res.redirect("/error");
    });
});

app.listen(port, function () {
  console.log(`server is running on port ${port}.`);
});
