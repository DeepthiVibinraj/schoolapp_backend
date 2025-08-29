const Parent = require("./models/parent");

const parentResolver = {
  Mutation: {
    addHomework: async (_, { input }) => {
      const homework = await Homework.create(input);

      const students = input.students;
      const parents = await Parent.find({ children: { $in: students } });

      let tokens = [];
      parents.forEach((p) => {
        if (p.fcmTokens) tokens.push(...p.fcmTokens);
      });

      await sendPushNotification(tokens, {
        title: "New Homework Assigned",
        body: "Please check the homework details in the app",
      });

      return homework;
    },
  },
};
module.exports = parentResolver;
