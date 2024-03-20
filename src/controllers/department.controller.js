"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Department = require("../models/department.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Department);

    res.status(200).send({
      error: false,
      message: "Departments listed succesfully",
      details: await res.getModelListDetails(Department),
      data,
    });
  },
  create: async (req, res) => {
    let data = new Department(req.body);
    data = await data.save();
    res.status(201).send({
      error: false,
      message: "Department created succesfully",
      details: await res.getModelListDetails(Department),
      data,
    });
  },
  read: async (req, res) => {
    const id = req.params?.id;
    const data = await Department.findOne({ _id: id });
    res.status(200).send({
      error: false,
      message: "Department listed succesfully",
      details: await res.getModelListDetails(Department),
      data,
    });
  },
  update: async (req, res) => {
    const id = req.params?.id;
    const newData = req.body;
    await Department.updateOne({ _id: id }, newData);
    const data = await Department.findOne({ _id: id });

    res.status(200).send({
      error: false,
      message: "Department updated succesfully",
      details: await res.getModelListDetails(Department),
      data,
    });
  },
  delete: async (req, res) => {
    const id = req.params?.id;
    const data = await Department.findOne({ _id: id });
    if (!data) {
      res.errorStatusCode = 404;
      throw new Error("There is not such department with this ID");
    } else {
      await Department.deleteOne({ _id: id });

      res.status(200).send({
        error: false,
        message: "Department updated succesfully",
        details: await res.getModelListDetails(Department),
        data,
      });
    }
  },
};
