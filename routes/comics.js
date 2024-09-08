const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 20;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&skip=${skip}&limit${limit}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:id", async (req, res) => {
  try {
    let url = `https://lereacteur-marvel-api.herokuapp.com/comics`;
    const { id } = req.params;
    const api = process.env.API_KEY;
    const response = await axios.get(`${url}/${id}?apiKey=${api}`);
    if (!response.data) {
      return res.status(404).json({ message: "Comic not found" });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:id", async (req, res) => {
  try {
    let url = `https://lereacteur-marvel-api.herokuapp.com/comics`;
    const { id } = req.params;
    const api = process.env.API_KEY;
    const response = await axios.get(`${url}/${id}?apiKey=${api}`);
    if (!response.data) {
      return res.status(404).json({ message: "Comic not found" });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/comic/:id", async (req, res) => {
  try {
    let url = `https://lereacteur-marvel-api.herokuapp.com/comic`;
    const { id } = req.params;
    const api = process.env.API_KEY;
    const response = await axios.get(`${url}/${id}?apiKey=${api}`);
    if (!response.data) {
      return res.status(404).json({ message: "Comic not found" });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
