const axios = require("axios");
const serviceAccount = require("./firebase-service-account.json");

const SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"];

async function getAccessToken() {
  try {
    const jwtClient = new google.auth.JWT(
      serviceAccount.client_email,
      null,
      serviceAccount.private_key,
      SCOPES
    );

    await jwtClient.authorize();
    const { token } = await jwtClient.getAccessToken();
    return token;
  } catch (error) {
    console.error(" Error fetching access token:", error);
    throw error;
  }
}

async function sendNotificationToTopic(topic, title, body) {
  try {
    const accessToken = await getAccessToken();

    const messagePayload = {
      message: {
        topic,
        notification: {
          title,
          body,
        },
      },
    };

    const response = await axios.post(
      `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
      messagePayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(" FCM Notification Sent:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      " Error sending FCM notification:",
      error.response?.data || error.message || error
    );
    throw error;
  }
}

module.exports = {
  sendNotificationToTopic,
};
