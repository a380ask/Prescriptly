// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {type: Number, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Users", userSchema);

