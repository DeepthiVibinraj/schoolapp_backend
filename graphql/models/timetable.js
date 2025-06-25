const mongoose = require("mongoose");

const DayScheduleSchema = new mongoose.Schema({
  day: { type: String, required: true },
  periods: [{ type: String, required: true }],
});

const TimeTableSchema = new mongoose.Schema({
  className: { type: String, required: true },
  schedule: { type: [DayScheduleSchema], required: true },
});

module.exports = mongoose.model("TimeTable", TimeTableSchema);
