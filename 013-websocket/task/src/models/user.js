const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: false,
  },
});

const User = model("User", UserSchema);
module.exports = User;
