"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
const Token = require("../controllers/token.controller");
const Permissions = require("../middlewares/permissions");
const { isAdmin } = require("../middlewares/permissions");
/* ------------------------------------------------------- */

// router
//   .route("/")
//   .get(Permissions.isAdmin, Token.list)
//   .post(Permissions.isAdmin, Token.create);

// router
//   .route("/:id")
//   .get(Permissions.isAdmin, Token.read)
//   .put(Permissions.isAdmin, Token.update)
//   .patch(Permissions.isAdmin, Token.update)
//   .delete(Permissions.isAdmin, Token.delete);

//! VEYA

// router.use(Permissions.isAdmin);
router.use(isAdmin);

router.route("/").get(Token.list).post(Token.create);

router
  .route("/:id")
  .get(Token.read)
  .put(Token.update)
  .patch(Token.update)
  .delete(Token.delete);

/* ------------------------------------------------------- */
module.exports = router;
