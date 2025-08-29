// module.exports = admin;// firebase_admin.js
const admin = require("firebase-admin");
// const serviceAccount = require("./firebase-service-account.json");
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString()
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
