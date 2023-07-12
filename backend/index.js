const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const url = "/api/v1/quest";

app.post(url, (req, res) => {
  const answer = req.body;
  res.send(answer);
});

const port = 5001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
