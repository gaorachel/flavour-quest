const express = require("express");

const app = express();

app.get("/api/v1/quest", (req, res) => {
  res.send("working");
});

const port = 5001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
