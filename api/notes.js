const notes = require("express").Router();
const path = require("path");

let db = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

notes.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../db/db.json"),
    "utf8",
    function (err, data) {
      res.json(JSON.parse(data));
      // Display the file content
    }
  );
  //   res.send(path.join(__dirname, "../db/db.json"));
  // const newDB = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8");
  // console.log(newDB);
  // res.json(path.join(__dirname, "/db/db.json"));
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;
  const note = {
    id: uuidv4(),
    title: title,
    text: text,
  };
  const noteList = [...db, note];
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(noteList)
  );
  let updatedDB = fs.readFileSync(
    path.join(__dirname, "../db/db.json"),
    "utf-8"
  );
  res.json(JSON.parse(updatedDB));
});

notes.delete("/:id", (req, res) => {
  let result = db.filter((el) => el.id !== req.params.id);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(result)
  );
  res.json(result);
});

module.exports = notes;
