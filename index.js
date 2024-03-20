"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const { dbConnection } = require("./src/configs/dbConnection");

/* ------------------------------------------------------- */
// ENV VARIABLES
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const SECRET_KEY = process.env.SECRET_KEY;

// Apı'den gelen verileri otomatik parse etmek için kullanılan kod
app.use(express.json());
// continue from here...

// Database Connection
dbConnection();

// Cookies
const session = require("cookie-session");
app.use(
  session({
    secret: SECRET_KEY,
    // maxAge: 1000 * 60 * 60 * 24 * 3,  --3gün duracak cookiesler
  })
);

// SORT-SEARCH-PAGE
const findSearchSortPage = require("./src/middlewares/findSearchSortPage");
app.use(findSearchSortPage);

// ROUTING
app.all("/", (req, res) => {
  res.send("Welcome to the Personnel API");
});

app.use("/departments", require("./src/routes/department.router"));
app.use("/personnels", require("./src/routes/personnel.router"));

// errorHandler:  En altta olması gerekmektedir.
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://" + HOST + ":" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
