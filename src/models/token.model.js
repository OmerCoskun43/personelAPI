"use strict";

const { mongoose } = require("../configs/dbConnection");

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel",
      required: true,
      index: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true, collection: "tokens" }
);

const Token = new mongoose.model("Token", TokenSchema);
module.exports = Token;
