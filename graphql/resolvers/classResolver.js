const Class = require("../models/classs");

const classResolver = {
  Query: {
    getClasses: async () => {
      try {
        return await Class.find();
      } catch (error) {
        console.error("Error fetching classes:", error);
        throw new Error("Failed to fetch classes");
      }
    },
    getClassById: async (_, { id }) => {
      try {
        return await Class.findById(id);
      } catch (error) {
        throw new Error("Failed to fetch classes");
      }
    },
  },
  Mutation: {
    addClass: async (_, { name }) => {
      try {
        const newClass = new Class({
          name,
        });
        return await newClass.save();
      } catch (error) {
        throw new Error("Failed to add class");
      }
    },
    updateClass: async (_, { id, name }) => {
      try {
        return await Class.findByIdAndUpdate(id, { name }, { new: true });
      } catch (error) {
        throw new Error("Failed to update class");
      }
    },
    deleteClass: async (_, { id }) => {
      try {
        await Class.findByIdAndDelete(id);
        return "Class deleted successfully";
      } catch (error) {
        throw new Error("Failed to delete class");
      }
    },
  },
};

module.exports = classResolver;
