"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

/* ------------------------------------------------------- */
// ENV VARIABLES
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Apı'den gelen verileri otomatik parse etmek için kullanılan kod
app.use(express.json());
// continue from here...

app.all("/", (req, res) => {
  res.send("Welcome to the Personnel API");
});
/* ------------------------------------------------------- */

// errorHandler:  En altta olması gerekmektedir.
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://" + HOST + ":" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
