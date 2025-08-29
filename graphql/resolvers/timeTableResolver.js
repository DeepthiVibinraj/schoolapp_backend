const TimeTable = require("../models/timetable");

const timeTableResolver = {
  Query: {
    timeTables: async () => {
      return await TimeTable.find();
    },
    timeTable: async (_, { id }) => {
      return await TimeTable.findById(id);
    },
    getTimetableByClass: async (_, { className }) => {
      return await TimeTable.findOne({ className });
    },
  },
  Mutation: {
    addTimeTable: async (_, { className, schedule }) => {
      const newTimeTable = new TimeTable({ className, schedule });
      return await newTimeTable.save();
    },
    updateTimeTable: async (_, { id, className, schedule }) => {
      const updatedTimeTable = await TimeTable.findByIdAndUpdate(
        id,
        { className, schedule },
        { new: true }
      );
      return updatedTimeTable;
    },
    deleteTimeTable: async (_, { id }) => {
      return await TimeTable.findByIdAndDelete(id);
    },
  },
};

module.exports = timeTableResolver;
