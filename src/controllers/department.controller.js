"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Department = require("../models/department.model");
const Personnel = require("../models/personnel.model");

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
    await Department.updateOne({ _id: id }, newData, { runValidators: true });

    res.status(202).send({
      error: false,
      message: "Department updated succesfully",
      details: await res.getModelListDetails(Department),
      data: await Department.findOne({ _id: id }),
    });
  },
  delete: async (req, res) => {
    const id = req.params?.id;
    const data = await Department.findOne({ _id: id });
    //! Birinci Yöntem
    // if (!data) {
    //   res.errorStatusCode = 404;
    //   throw new Error("There is not such department with this ID");
    // } else {
    //   await Department.deleteOne({ _id: id });

    //   res.status(204).send({
    //     error: false,
    //     message: "Department updated succesfully",
    //     details: await res.getModelListDetails(Department),
    //     data,
    //   });
    // }

    //! İkinci Yöntem

    const dataa = await Department.deleteOne({ _id: id });

    res.status(dataa.deletedCount > 0 ? 204 : 404).send({
      error: !dataa.deletedCount,
      message: dataa.deletedCount
        ? "Department deleted succesfully"
        : "There is not such an Department with this ID",
      data,
    });
  },

  personnels: async (req, res) => {
    const data = await res.getModelList(
      Personnel,
      { departmentId: req.params.id },
      "departmentId"
    );

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel, {
        departmentId: req.params.id,
      }),
      data,
    });
  },
};
