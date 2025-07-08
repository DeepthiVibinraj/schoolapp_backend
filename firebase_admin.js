const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(), // or use a service account
});

module.exports = admin;
