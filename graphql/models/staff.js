const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  qualification: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Staff", StaffSchema);
