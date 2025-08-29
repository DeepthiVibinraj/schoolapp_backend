const mongoose = require("mongoose");

const SubjectHomeworkSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  homework: { type: String, required: true },
});

const HomeworkSchema = new mongoose.Schema({
  classLevel: { type: String, required: true },
  subjectHomeworks: [SubjectHomeworkSchema],
});

module.exports = mongoose.model("Homework", HomeworkSchema);
