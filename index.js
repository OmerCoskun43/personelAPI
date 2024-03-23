"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const { dbConnection } = require("./src/configs/dbConnection");
// const morgan = require("morgan");

/* ------------------------------------------------------- */
// ENV VARIABLES
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const SECRET_KEY = process.env.SECRET_KEY;

// Apı'den gelen verileri otomatik parse etmek için kullanılan kod
app.use(express.json());
// continue from here...

//! DOCUMENTATION
// $ npm i swagger-autogen
// $ npm i swagger-ui-express
// $ npm i redoc-express

//? JSON
const swaggerJson = require("./swagger.json");
app.use("/documents/json", (req, res) => {
  res.sendFile(__dirname + "/swagger.json");
});

//?SWAGGER
const swaggerUi = require("swagger-ui-express");
app.use(
  "/documents/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true },
  })
);

//? REDOC
const redoc = require("redoc-express");
app.use(
  "/documents/redoc",
  redoc({
    title: "PersonnelAPI",
    specUrl: "/documents/json",
  })
);

// Database Connection
dbConnection();

// MORGAN MIDDLEWARE
// app.use(require("./src/middlewares/logging"));

// MORGAN LOGGING
// https://expressjs.com/en/resources/middleware/morgan.html
// https://github.com/expressjs/morgan

// app.use(morgan("combined"));
// app.use(morgan("common"));
// app.use(morgan("tiny"));
// app.use(
//   morgan(
//     "IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer |  AGENT=:user-agent"
//   )
// );

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

// Auth Simple Token
app.use(require("./src/middlewares/authentication"));

// Permission Middleware
// app.use(require("./src/middlewares/permissions"));

// ROUTING
app.all("/", (req, res) => {
  res.send({
    message: "Welcome to the Personnel Api",
    user: req.user,
    api: {
      documents: {
        swagger: "http://127.0.0.1:8000/documents/swagger",
        redoc: "http://127.0.0.1:8000/documents/redoc",
        json: "http://127.0.0.1:8000/documents/json",
      },
      contact: "contact@clarusway.com",
    },
  });
});

// app.use("/departments", require("./src/routes/department.router"));
// app.use("/personnels", require("./src/routes/personnel.router"));

app.use(require("./src/routes/index"));

// errorHandler:  En altta olması gerekmektedir.
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://" + HOST + ":" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require("./src/helpers/sync")();
