"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Personnel, "departmentId");

    res.status(200).send({
      error: false,
      message: "Personnels listed succesfully",
      details: await res.getModelListDetails(Personnel),
      data,
    });
  },
  create: async (req, res) => {
    if (req.body.isLead) {
      await Personnel.updateMany(
        {
          departmentId: req.body.departmentId,
          isLead: true,
        },
        { isLead: false }
      );
    }

    let data = new Personnel(req.body);
    data = await data.save();
    res.status(201).send({
      error: false,
      message: "Personnel created succesfully",
      details: await res.getModelListDetails(Personnel),
      data,
    });
  },
  read: async (req, res) => {
    const id = req.params?.id;
    const data = await Personnel.findOne({ _id: id });
    res.status(200).send({
      error: false,
      message: "Personnel listed succesfully",
      details: await res.getModelListDetails(Personnel),
      data,
    });
  },
  update: async (req, res) => {
    if (req.body.isLead) {
      const { departmentId } = await Personnel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );

      await Personnel.updateMany({ departmentId }, { isLead: false });
    }

    const id = req.params?.id;
    const newData = req.body;
    await Personnel.updateOne({ _id: id }, newData, { runValidators: true });

    res.status(202).send({
      error: false,
      message: "Personnel updated succesfully",
      details: await res.getModelListDetails(Personnel),
      data: await Personnel.findOne({ _id: id }),
    });
  },
  delete: async (req, res) => {
    const id = req.params?.id;
    const data = await Personnel.findOne({ _id: id });
    //! Birinci Yöntem
    // if (!data) {
    //   res.errorStatusCode = 404;
    //   throw new Error("There is not such department with this ID");
    // } else {
    //   await Personnel.deleteOne({ _id: id });

    //   res.status(204).send({
    //     error: false,
    //     message: "Personnel updated succesfully",
    //     details: await res.getModelListDetails(Personnel),
    //     data,
    //   });
    // }

    //! İkinci Yöntem

    const dataa = await Personnel.deleteOne({ _id: id });

    res.status(dataa.deletedCount > 0 ? 204 : 404).send({
      error: !dataa.deletedCount,
      message: dataa.deletedCount
        ? "Personnel deleted succesfully"
        : "There is not such an Personnel with this ID",
      data,
    });
  },
};
