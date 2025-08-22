const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  venue: { type: String, required: true },
});

module.exports = mongoose.model("Event", EventSchema);
