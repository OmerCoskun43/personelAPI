"use strict";

"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Token = require("../models/token.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Token);

    res.status(200).send({
      error: false,
      message: "Tokens listed succesfully",
      details: await res.getModelListDetails(Token),
      data,
    });
  },
  create: async (req, res) => {
    let data = new Token(req.body);
    data = await data.save();
    res.status(201).send({
      error: false,
      message: "Token created succesfully",
      details: await res.getModelListDetails(Token),
      data,
    });
  },
  read: async (req, res) => {
    const id = req.params?.id;
    const data = await Token.findOne({ _id: id });
    res.status(200).send({
      error: false,
      message: "Token listed succesfully",
      details: await res.getModelListDetails(Token),
      data,
    });
  },
  update: async (req, res) => {
    const id = req.params?.id;
    const newData = req.body;
    await Token.updateOne({ _id: id }, newData, { runValidators: true });

    res.status(202).send({
      error: false,
      message: "Token updated succesfully",
      details: await res.getModelListDetails(Token),
      data: await Token.findOne({ _id: id }),
    });
  },
  delete: async (req, res) => {
    const id = req.params?.id;
    const data = await Token.findOne({ _id: id });
    const dataa = await Token.deleteOne({ _id: id });

    res.status(dataa.deletedCount > 0 ? 204 : 404).send({
      error: !dataa.deletedCount,
      message: dataa.deletedCount
        ? "Token deleted succesfully"
        : "There is not such an Token with this ID",
      data,
    });
  },
};
