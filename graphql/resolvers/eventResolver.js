const Event = require("../models/event");

const eventResolver = {
  Query: {
    getEvents: async () => {
      try {
        return await Event.find();
      } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events");
      }
    },
    getEventById: async (_, { id }) => {
      try {
        return await Event.findById(id);
      } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw new Error("Failed to fetch event");
      }
    },
  },
  Mutation: {
    addEvent: async (_, { eventName, eventDate, venue }) => {
      try {
        const newEvent = new Event({
          eventName,
          eventDate,
          venue,
        });
        return await newEvent.save();
      } catch (error) {
        throw new Error("Failed to add event");
      }
    },
    updateEvent: async (_, { id, eventName, eventDate, venue }) => {
      try {
        return await Event.findByIdAndUpdate(
          id,
          { eventName, eventDate, venue },
          { new: true }
        );
      } catch (error) {
        throw new Error("Failed to update event");
      }
    },
    deleteEvent: async (_, { id }) => {
      try {
        await Event.findByIdAndDelete(id);
        return "Event deleted successfully";
      } catch (error) {
        console.error("Error deleting event:", error);
        throw new Error("Failed to delete event");
      }
    },
  },
};

module.exports = eventResolver;
