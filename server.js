// dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

//handling asynchronous process
const readFileAsync = util.promisify(fs.readFileSync);
const writeFileAsync = util.promisify(fs.writeFile);

// set up server
const app = express();
const PORT = process.env.PORT || 3001;

// static middleware

app.use(express.urlencoded({ extended: true }));

// api route / get request
app.get("/api/notes", function (req, res) {
  readFileAsync("./db/db.json", "utf-8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.join(notes);
  });
});

// api route / post request
app.post("/api/notes", function (req, res) {
  const note = req.body;
  readFileAsync("./db/db.json", "utf-8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1;
      notes.push(note);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.JSON(note);
    });
});

// api route / delete request
app.delete();

//  html routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get();
res.sendFile(path.join(__dirname, "./public/index.html"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
