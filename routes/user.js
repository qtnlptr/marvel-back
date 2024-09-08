const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(409).json({ message: "Username already registered" });
    } else if (!password) {
      return res.status(400).json({ message: "Please enter a valid password" });
    } else if (username === "" || !username) {
      return res.status(400).json({ message: "Please enter a valid username" });
    }

    const salt = uid2(16);
    const hash = SHA256(req.body.password + salt).toString(encBase64);
    const token = uid2(64);

    const newUser = new User({
      username: username,
      favComics: [],
      favChar: [],
      hash: hash,
      salt: salt,
      token: token,
    });

    await newUser.save();
    return res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
      account: newUser.account,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account found with this username" });
    }
    const passwordToTest = SHA256(password + user.salt).toString(encBase64);
    if (passwordToTest !== user.hash) {
      res.status(400).json({ message: "Password is incorrect" });
    } else if (passwordToTest === user.hash) {
      return res
        .status(200)
        .json({ id: user.id, token: user.token, favChar: [], favComic: [] });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
