// Main file to start server
const express = require("express");
const app = express();
const router = require("./index");
const PORT = process.env.PORT || 3001;

// Middleware to use router to main pages
app.use("/", router);

app.listen(
  PORT,
  console.log(`Server is listenning at http://localhost:${PORT}`)
);
