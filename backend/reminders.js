// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const remindersSchema = new Schema(
  {
    userid: {type: String, required: true},
    useremail: {type: String, required: true},
    medname: {type: String, required: true},
    hours: {type: Number, required: true},
    min: {type: Number, required: true}
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Reminders", remindersSchema);

