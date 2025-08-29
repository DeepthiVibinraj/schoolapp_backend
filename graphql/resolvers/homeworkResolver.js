const Homework = require("../models/homework");
const admin = require("../../firebase_admin");

const homeworkResolver = {
  Query: {
    getHomework: async () => await Homework.find(),
    getHomeworkByClassLevel: async (_, { classLevel }) =>
      await Homework.find({ classLevel }),
  },
  Mutation: {
    addHomework: async (_, { classLevel, subjectHomeworks }) => {
      const newHomework = new Homework({ classLevel, subjectHomeworks });
      const saved = await newHomework.save();

      try {
        await admin.messaging().send({
          topic: `class-${classLevel}`,
          notification: {
            title: "New Homework Assigned",
            body: `New homework posted for Class ${classLevel}`,
          },
          android: {
            priority: "high",
          },
          apns: {
            payload: {
              aps: {
                sound: "default",
              },
            },
          },
        });
      } catch (error) {
        console.error("Error sending FCM notification:");

        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        }

        if (error.code || error.message) {
          console.error("Code:", error.code);
          console.error("Message:", error.message);
        }

        console.error("Full error object:", error);
      }

      return saved;
    },
    deleteHomework: async (_, { id }) =>
      !!(await Homework.findByIdAndDelete(id)),
  },
};

module.exports = homeworkResolver;
