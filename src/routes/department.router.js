"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
const Department = require("../controllers/department.controller");
const Permissions = require("../middlewares/permissions");
/* ------------------------------------------------------- */

router
  .route("/")
  .get(Permissions.isLogin, Department.list)
  .post(Permissions.isAdmin, Department.create);
router.get("/:id/personnels", Permissions.isAdminOrLead, Department.personnels);

router
  .route("/:id")
  .get(Permissions.isLogin, Department.read)
  .put(Permissions.isAdmin, Department.update)
  .patch(Permissions.isAdmin, Department.update)
  .delete(Permissions.isAdmin, Department.delete);

/* ------------------------------------------------------- */
module.exports = router;
