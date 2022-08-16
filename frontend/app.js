"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const path = require("path");

let state = {};
let ipAddresses = new Set();
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("creation", { state });
});

// parse request body to suitable object
function parseBody(id, body) {
  const question = body.question;
  delete body.question;
  const options = Object.values(body).filter((element) => {
    return element !== "";
  });
  const results = {};
  const totalVotes = 0;
  return { id, question, options, results, totalVotes };
}

// create new poll
app.post("/vote", (req, res) => {
  const id = Math.random().toString(36).slice(2); // repeat after 70M expected
  const poll = parseBody(id, req.body);
  // TODO export to db here
  state[id] = poll;
  res.redirect("/vote/" + id);
});

app.get("/vote/:paramName", (req, res) => {
  const id = req.params.paramName;

  // TODO import to db here
  const poll = state[id];
  res.render("vote", { poll });
});

function addVote(id, order) {
  let poll = state[id];
  let results = poll.results;
  let i = order.toString();
  results[i] = (results[i] || 0) + 1;
  poll.totalVotes += 1;
  // TODO add to DB here
}

// n is numoptions, p is permutations, p = O(n!), altogether O(pn^3)->(n!n^3)
function calculateOrder(result, numOptions) {
  let index = 0;
  let order = {}; // could use hashmap for quicker contains, takes up memory?
  let rankedOptions = [];
  let removed = [];
  // O(p)
  let total = Object.values(result).reduce((acc, val) => acc + val, 0);
  // O(n-1 + n-2+ n-3 ...) = O(n^2) worst case, average O(n)
  while (rankedOptions.length < numOptions) {
    let [minPercentage, minOption] = [1, 0];
    let [maxPercentage, maxOption] = [0, 0];
    let tallies = {};
    // O(p)
    Object.entries(result).forEach(([key, value]) => {
      // O(n)
      key = key.split(",");
      let index = 0;
      let option = key[index];
      // O(n)
      while (rankedOptions.includes(option) || removed.includes(option)) {
        option = key[++index];
      }
      tallies[option] = (tallies[option] || 0) + value;
    });
    Object.entries(tallies).forEach(([option, votes]) => {
      let tallyPercentage = votes / total;
      if (tallyPercentage < minPercentage) {
        [minPercentage, minOption] = [tallyPercentage, option];
      }
      if (tallyPercentage > maxPercentage) {
        [maxPercentage, maxOption] = [tallyPercentage, option];
      }
    });
    if (maxPercentage == minPercentage) {
      let keys = Object.keys(tallies);
      order[index++] = keys;
      rankedOptions = rankedOptions.concat(keys);
      removed = [];
    } else if (maxPercentage <= 0.5) {
      removed.push(minOption);
    } else {
      order[index++] = [maxOption];
      rankedOptions.push(maxOption);
      removed = [];
    }
  }

  return order;
}

app.post("/results", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const order = req.body.order;
  let poll = state[id];
  const ip = req.headers["x-forwarded-for"];
  if (ipAddresses.has(ip)) {
    res.redirect("/vote/" + id);
    console.log("ip already voted");
  } else {
    // ipAddresses.add(ip); // commented for debugging purposes
    addVote(id, order);
    // TODO somehow cache it? maybe unnecessary
    let numOptions = poll.options.length;
    let results = poll.results;
    poll.rankings = calculateOrder(results, numOptions);
  }

  res.redirect("/vote/" + id + "/r");
});

app.get("/vote/:paramName/r", (req, res) => {
  const id = req.params.paramName;
  // TODO import from DB here
  const poll = state[id];
  res.render("results", { poll });
});

app.listen(port, function () {
  console.log(`server is running on port ${port}.`);
});
