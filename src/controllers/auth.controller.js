"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");
module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await Personnel.findOne({ username, password });

    //! Session Cookie Usage
    // if (username && password) {
    //   const user = await Personnel.findOne({ username, password });
    //   if (user) {
    //     // Set Session:
    //     req.session = {
    //       id: user._id,
    //       password: user.password,
    //     };
    //     // Set Cookie:
    //     if (req.body?.rememberMe) {
    //       req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
    //     }

    //     res.status(200).send({
    //       error: false,
    //       user,
    //     });
    //   } else {
    //     res.errorStatusCode = 401;
    //     throw new Error("Wrong Username or Password.");
    //   }
    // } else {
    //   res.errorStatusCode = 401;
    //   throw new Error("Please entry username and password.");
    // }

    //! Token Usage
    let tokenData = await Token.findOne({ userId: user._id });
    const tokenKey = passwordEncrypt(user._id + Date.now());

    if (!tokenData) {
      tokenData = await Token.create({ userId: user._id, token: tokenKey });
    }

    res.status(200).send({
      error: false,
      token: tokenData.token,
      user,
    });
  },

  logout: async (req, res) => {
    // Set session to null:
    // req.session = null;

    //! Token Usage
    //? 1. Yöntem
    await Token.deleteOne({ userId: req.user._id });

    //? 2. Yöntem
    // const auth = req.headers?.authorization || null;
    // const tokenKey = auth ? auth.split(" ") : null;

    // if (tokenKey && tokenKey[0] == "Token") {
    //   await Token.deleteOne({ token: tokenKey[1] });
    // }

    res.status(200).send({
      error: false,
      message: "Logout: Sessions Deleted.",
    });
  },
};
