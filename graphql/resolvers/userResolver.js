const User = require("../models/user");

const userResolver = {
  Mutation: {
    addUser: async (_, { userName, userEmail, userRole }) => {
      try {
        const newUser = new User({ userName, userEmail, userRole });
        return await newUser.save();
      } catch (error) {
        throw new Error("Failed to add user");
      }
    },
  },
};

module.exports = userResolver;
