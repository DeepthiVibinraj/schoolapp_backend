const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userRole: { type: String, default: "parent" }, // Default role: parent
});

module.exports = mongoose.model("User", UserSchema);
