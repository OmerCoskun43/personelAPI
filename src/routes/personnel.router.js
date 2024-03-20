"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
const Personnel = require("../controllers/personnel.controller");
/* ------------------------------------------------------- */

// Login/logout:
router.post("/login", Personnel.login);
router.all("/logout", Personnel.logout);

router.route("/").get(Personnel.list).post(Personnel.create);

router
  .route("/:id")
  .get(Personnel.read)
  .put(Personnel.update)
  .patch(Personnel.update)
  .delete(Personnel.delete);

/* ------------------------------------------------------- */
module.exports = router;
