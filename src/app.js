import express from "express";
const app = express();
import path from "node:path";

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1> Hello World </h1>");
});

// middlewares

// error handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "internal server error" });
});

export default app;
