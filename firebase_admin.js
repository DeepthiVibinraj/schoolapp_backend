// // // const admin = require("firebase-admin");

// // // admin.initializeApp({
// // //   credential: admin.credential.applicationDefault(), // or use a service account
// // // });

// // // module.exports = admin;
// // const admin = require("firebase-admin");

// // if (!admin.apps.length) {
// //   if (process.env.NODE_ENV === "production") {
// //     // On Render (or other deployed env), use default credentials
// //     admin.initializeApp();
// //   } else {
// //     // On localhost, use the service account file
// //     const serviceAccount = require("./firebase-service-account.json");
// //     admin.initializeApp({
// //       credential: admin.credential.cert(serviceAccount),
// //     });
// //   }
// // }

// // module.exports = admin;
// const admin = require("firebase-admin");

// if (!admin.apps.length) {
//   if (process.env.NODE_ENV === "production") {
//     // ✅ Use service account JSON from Render environment variable
//     const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//   } else {
//     // ✅ Local: load from file
//     const serviceAccount = require("./firebase-service-account.json");

//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//   }
// }

// module.exports = admin;
const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = require("./firebase-service-account.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
