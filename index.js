const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/marvel");

const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const userRoutes = require("./routes/user");
const favRoutes = require("./routes/favorites");

app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(userRoutes);
app.use(favRoutes);

app.get("/", (req, res) => {
  res.status(200).json("Bienvenue");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server started");
});
