// const axios = require("axios");

// // Your FCM Server Key (from Google Cloud Console, restricted to Firebase Cloud Messaging API)
// const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY;
// async function sendPushNotification(tokens, notification) {
//   if (!tokens || tokens.length === 0) {
//     console.log("No FCM tokens provided.");
//     return;
//   }

//   const payload = {
//     registration_ids: tokens,
//     notification: {
//       title: notification.title,
//       body: notification.body,
//     },
//     priority: "high",
//   };

//   try {
//     const response = await axios.post(
//       "https://fcm.googleapis.com/fcm/send",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `key=${FCM_SERVER_KEY}`,
//         },
//       }
//     );

//     console.log("✅ FCM Response:", response.data);
//   } catch (error) {
//     console.error(
//       "❌ Error sending FCM notification:",
//       error?.response?.data || error.message
//     );
//   }
// }

// module.exports = { sendPushNotification };

//
//
//
//

// const axios = require("axios");

// const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY;

// async function sendPushNotification(tokens, notification) {
//   if (!tokens || tokens.length === 0) {
//     console.log("No FCM tokens provided.");
//     return;
//   }

//   const payload = {
//     registration_ids: tokens,
//     notification: {
//       title: notification.title,
//       body: notification.body,
//     },
//     priority: "high",
//   };

//   try {
//     const response = await axios.post(
//       "https://fcm.googleapis.com/fcm/send",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `key=${FCM_SERVER_KEY}`,
//         },
//       }
//     );

//     console.log("✅ FCM Response:", response.data);
//   } catch (error) {
//     console.error(
//       "❌ Error sending FCM notification:",
//       error?.response?.data || error.message
//     );
//   }
// }

// module.exports = { sendPushNotification };

// // utils/notificationSender.js
//
//
//
//
//

// const axios = require("axios");

// const sendTopicNotification = async (topic, title, body) => {
//   try {
//     await axios.post(
//       "https://fcm.googleapis.com/v1/projects/schoolapp-7e694/messages:send",
//       {
//         to: `/topics/${topic}`, // like /topics/class1
//         notification: {
//           title: title,
//           body: body,
//         },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `key=${process.env.FCM_SERVER_KEY}`, // Your FCM Server Key
//           Authorization: Bearer YOUR_OAUTH2_ACCESS_TOKEN

//         },
//       }
//     );

//     console.log(`Notification sent to topic: ${topic}`);
//   } catch (error) {
//     console.error("Error sending notification:", error.message);
//   }
// };

// module.exports = { sendTopicNotification };
//
//
//
const axios = require("axios");
const { google } = require("google-auth-library");
const path = require("path");

// 🔐 Get OAuth2 Access Token using service account
async function getAccessToken() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../firebase-service-account.json"), // ✅ Adjust path to your JSON file
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });

  const client = await auth.getClient();
  const accessTokenResponse = await client.getAccessToken();
  return accessTokenResponse.token;
}

// 📢 Send notification to topic (e.g., class-1)
const sendTopicNotification = async (topic, title, body) => {
  try {
    const accessToken = await getAccessToken();

    await axios.post(
      "https://fcm.googleapis.com/v1/projects/schoolapp-7e694/messages:send", // 🔁 Replace with your real project ID
      {
        message: {
          topic: topic,
          notification: {
            title: title,
            body: body,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(`✅ Notification sent to topic: ${topic}`);
  } catch (error) {
    console.error(
      "❌ Error sending notification:",
      error.response?.data || error.message
    );
  }
};

module.exports = { sendTopicNotification };
