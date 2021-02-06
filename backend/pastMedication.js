// /backend/medication.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pastMedicationSchema = new Schema(
  {
    id: {type: Number, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    prescribedMonth: {type: Number, required: true}, //might be better to switch to Schema.Types.Date
    prescribedDay: {type: Number, required: true},
    prescribedYear: {type: Number, required: true},
    instructions: {type: String, required: true},
    userID: {type: Schema.Types.ObjectId}
    

  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("PastMedication", pastMedicationSchema);
