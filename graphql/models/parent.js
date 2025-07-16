const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({
  name: String,
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  //fcmTokens: [String],
});

module.exports = mongoose.model("Parent", ParentSchema);
