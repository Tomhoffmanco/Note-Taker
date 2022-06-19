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
