"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
const Personnel = require("../controllers/personnel.controller");
const Permissions = require("../middlewares/permissions");
/* ------------------------------------------------------- */

// Login/logout:

router
  .route("/")
  .get(Permissions.isAdmin, Personnel.list)
  .post(Personnel.create);

router
  .route("/:id")
  .get(Permissions.isAdminOrOwn, Personnel.read)
  .put(Permissions.isAdminOrOwn, Personnel.update)
  .patch(Permissions.isAdminOrOwn, Personnel.update)
  .delete(Permissions.isAdmin, Personnel.delete);

/* ------------------------------------------------------- */
module.exports = router;
