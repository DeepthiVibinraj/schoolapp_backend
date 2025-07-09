const Homework = require("../models/homework");

const homeworkResolver = {
  Query: {
    getHomework: async () => {
      return await Homework.find();
    },
  },
  Mutation: {
    addHomework: async (_, { classLevel, subjectHomeworks }) => {
      const newHomework = new Homework({ classLevel, subjectHomeworks });
      return await newHomework.save();
    },
    deleteHomework: async (_, { id }) => {
      const result = await Homework.findByIdAndDelete(id);
      return !!result;
    },
  },
};

module.exports = homeworkResolver;
