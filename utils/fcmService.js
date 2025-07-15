const axios = require("axios");

// Your FCM Server Key (from Google Cloud Console, restricted to Firebase Cloud Messaging API)
const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY;
async function sendPushNotification(tokens, notification) {
  if (!tokens || tokens.length === 0) {
    console.log("No FCM tokens provided.");
    return;
  }

  const payload = {
    registration_ids: tokens,
    notification: {
      title: notification.title,
      body: notification.body,
    },
    priority: "high",
  };

  try {
    const response = await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `key=${FCM_SERVER_KEY}`,
        },
      }
    );

    console.log("✅ FCM Response:", response.data);
  } catch (error) {
    console.error(
      "❌ Error sending FCM notification:",
      error?.response?.data || error.message
    );
  }
}

module.exports = { sendPushNotification };
