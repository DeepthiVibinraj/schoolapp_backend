const Subject = require("../models/subject");

const subjectResolver = {
  Query: {
    getSubjects: async () => {
      try {
        return await Subject.find();
      } catch (error) {
        throw new Error("Failed to fetch subjects");
      }
    },
    getSubjectById: async (_, { id }) => {
      try {
        return await Subject.findById(id);
      } catch (error) {
        throw new Error("Failed to fetch subject");
      }
    },
  },
  Mutation: {
    addSubject: async (_, { name }) => {
      try {
        const newSubject = new Subject({
          name,
        });
        return await newSubject.save();
      } catch (error) {
        throw new Error("Failed to add subject");
      }
    },
    updateSubject: async (_, { id, name }) => {
      try {
        return await Subject.findByIdAndUpdate(id, { name }, { new: true });
      } catch (error) {
        throw new Error("Failed to update subject");
      }
    },
    deleteSubject: async (_, { id }) => {
      try {
        await Subject.findByIdAndDelete(id);
        return "Subject deleted successfully";
      } catch (error) {
        throw new Error("Failed to delete subject");
      }
    },
  },
};

module.exports = subjectResolver;
