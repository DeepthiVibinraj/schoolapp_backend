const Parent = require("./models/parent");
//const { sendPushNotification } = require("../utils/fcmService");

const parentResolver = {
  Mutation: {
    // saveParentFcmToken: async (_, { studentId, token }) => {
    //   // Find parents whose children array includes studentId
    //   const parents = await Parent.find({ children: studentId });

    //   for (const parent of parents) {
    //     if (!parent.fcmTokens.includes(token)) {
    //       parent.fcmTokens.push(token);
    //       await parent.save();
    //     }
    //   }

    //   return true;
    // },

    // Existing addHomework resolver
    addHomework: async (_, { input }) => {
      // Your logic to add homework in MongoDB
      const homework = await Homework.create(input);

      // Notify parents after saving homework
      const students = input.students; // student IDs array
      const parents = await Parent.find({ children: { $in: students } });

      let tokens = [];
      parents.forEach((p) => {
        if (p.fcmTokens) tokens.push(...p.fcmTokens);
      });

      // Send notifications (see next step)

      await sendPushNotification(tokens, {
        title: "New Homework Assigned",
        body: "Please check the homework details in the app",
      });

      return homework;
    },
  },
};
module.exports = parentResolver;
