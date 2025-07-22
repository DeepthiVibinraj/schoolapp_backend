// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   userName: { type: String, required: true },
//   userEmail: { type: String, required: true, unique: true },
//   userRole: { type: String, default: "parent" }, // Default role: parent
// });

// module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classLevel: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userRole: { type: String, default: "parent" },
  fcmToken: { type: String }, // ✅ NEW
  children: [ChildSchema], // ✅ NEW
});

module.exports = mongoose.model("User", UserSchema);
