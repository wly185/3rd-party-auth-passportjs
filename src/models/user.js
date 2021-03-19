const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  local: {
    password: String
  }
});

const User = mongoose.model("User", userSchema);

//usershema pre save hook
//match passwords

module.exports = User;
