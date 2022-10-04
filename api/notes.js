const notes = require("express").Router();
const path = require("path");
const { readFromFile, readAndAppend } = require("../utilities/fsUtils");

const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

notes.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;
  const note = {
    id: uuidv4(),
    title: title,
    text: text,
  };
  readAndAppend(note, path.join(__dirname, "../db/db.json"));
  readFromFile(path.join(__dirname, "../db/db.json")).then((result) =>
    res.json(JSON.parse(result))
  );
});

notes.delete("/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let result = JSON.parse(data).filter((el) => el.id !== req.params.id);
    fs.writeFile("./db/db.json", JSON.stringify(result), (err, data) => {
      res.json(result);
    });
  });
});

module.exports = notes;
