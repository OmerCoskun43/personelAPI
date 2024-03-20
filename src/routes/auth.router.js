"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();

const Auth = require("../controllers/auth.controller");

router.post("/login", Auth.login);
router.all("/logout", Auth.logout);

module.exports = router;
