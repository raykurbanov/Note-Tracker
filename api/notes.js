const notes = require("express").Router();
const path = require("path");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../utilities/fsUtils");

let db = require("../db/db.json");
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
  // const noteList = [...db, note];
  // fs.writeFileSync(
  //   path.join(__dirname, "../db/db.json"),
  //   JSON.stringify(noteList)
  // );

  readFromFile(path.join(__dirname, "../db/db.json")).then((result) =>
    res.json(JSON.parse(result))
  );
  // let updatedDB = fs.readFileSync(
  //   path.join(__dirname, "../db/db.json"),
  //   "utf-8"
  // );
  // res.json(JSON.parse(updatedDB));
});

notes.delete("/:id", (req, res) => {
  // writeToFile(path.join(__dirname, "../db/db.json"), result);

  // readFromFile(path.join(__dirname, "../db/db.json")).then((result) =>
  //   res.json(JSON.parse(result))
  // );

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    //Delete notes using a forEach method to filter a new note array
    let result = notes.filter((el) => el.id !== req.params.id);
    //Once new note is deleted, revert object back to string and write it to db.json
    fs.writeFile("./db/db.json", JSON.stringify(result), (err, data) => {
      res.json(notes);
      console.info("Successfully delete notes!");
    });
  });
  // fs.writeFileSync(
  //   path.join(__dirname, "../db/db.json"),
  //   JSON.stringify(result)
  // );
  // res.json(result);
});

module.exports = notes;
