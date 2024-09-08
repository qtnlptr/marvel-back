const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  favComics: [
    {
      id: String,
    },
  ],
  favChar: [
    {
      id: String,
    },
  ],
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
