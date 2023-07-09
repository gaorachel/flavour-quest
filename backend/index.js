const express = require("express");
const axios = require("axios");

const app = express();

const url = "/api/v1/quest";
const answer = [];

app.get(url, (req, res) => {
  res.send(answer);
});

app.post(url, (req, res) => {
  answer.push(req.body);

  res.status(200).json({
    status: "success",
    data: answer,
  });
});

const port = 5001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
