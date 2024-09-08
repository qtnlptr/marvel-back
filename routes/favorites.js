const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/favorites-char", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { favChar } = req.body;
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteIds = user.favChar.map((char) => char.id);
    console.log(favoriteIds);
    if (favoriteIds.includes(favChar)) {
      return res
        .status(400)
        .json({ message: "Character already in favorites" });
    }
    user.favChar.push({ id: favChar });
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/favorites-comics", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { favComics } = req.body;
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteIds = user.favComics.map((comic) => comic.id);
    // console.log(favoriteIds);
    if (favoriteIds.includes(favComics)) {
      return res.status(400).json({ message: "Comic already in favorites" });
    }
    user.favComics.push({ id: favComics });
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/favorites-char", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const favoriteCharIds = user.favChar.map((char) => char.id);
    return res.status(200).json(favoriteCharIds);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/favorites-comics", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const favoriteComicsIds = user.favComics.map((comic) => comic.id);
    return res.status(200).json(favoriteComicsIds);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/favorites-char", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { favChar } = req.body;
    const user = await User.findOne({ token });
    // console.log(user);
    user.favChar = user.favChar.filter(
      (char) => {
        return char.id !== favChar;
      }
      // console.log(char.id)
    );

    await user.save();

    // console.log(user.favChar);
    res.status(200).json({ favChar: user.favChar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/favorites-comics", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { favComics } = req.body;
    const user = await User.findOne({ token });
    // console.log(user);
    user.favComics = user.favComics.filter(
      (comic) => {
        return comic.id !== favComics;
      }
      // console.log(char.id)
    );

    await user.save();

    // console.log(user.favChar);
    res.status(200).json({ favComics: user.favComics });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
