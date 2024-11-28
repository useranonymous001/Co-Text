const express = require("express");
const app = express();
const path = require("node:path");
const PORT = process.env.PORT || 1010;

app.get("/dashboard", (req, res) => {
  res.send("Just the end of beginning");
});

app.listen(PORT, (req, res, err) => {
  console.log(err ? err.message : `Server started at port ${PORT}`);
});
