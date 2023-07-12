const express = require("express");
const axios = require("axios");
const { askGPT } = require("./openai");

const app = express();
app.use(express.json());

const url = "/api/v1/quest";

app.get(url, async (req, res) => {
  const answer = req.body;
  const response = await askGPT(answer);
  res.setHeader("Content-type", "text/html").send(response.content);
});

const port = 5001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
