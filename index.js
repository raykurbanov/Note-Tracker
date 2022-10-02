const express = require("express");
const router = express.Router();
const path = require("path");
const api = require("./api/index");

// Middleware to use static files/work with JS objects/read queries
router.use(express.static("public"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/api", api);

// Routes

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

module.exports = router;
