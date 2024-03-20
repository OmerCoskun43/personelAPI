"use strict";

const router = require("express").Router();

router.use("/departments", require("./department.router"));
router.use("/personnels", require("./personnel.router"));
router.use("/tokens", require("./token.router"));
router.use("/auth", require("./auth.router"));

module.exports = router;
