"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
const Department = require("../controllers/department.controller");
/* ------------------------------------------------------- */

router.route("/").get(Department.list).post(Department.create);
router.get("/:id/personnels", Department.personnels);

router
  .route("/:id")
  .get(Department.read)
  .put(Department.update)
  .patch(Department.update)
  .delete(Department.delete);

/* ------------------------------------------------------- */
module.exports = router;
