const Staff = require("../models/staff");

const staffResolver = {
  Query: {
    getStaffs: async () => {
      try {
        return await Staff.find();
      } catch (error) {
        console.error("Error fetching staffs:", error);
        throw new Error("Failed to fetch staffs");
      }
    },
    getStudentById: async (_, { id }) => {
      try {
        return await Staff.findById(id);
      } catch (error) {
        throw new Error("Failed to fetch staff");
      }
    },

    getStaffByEmail: async (_, { email }) => {
      try {
        return await Staff.find({ email });
      } catch (error) {
        throw new Error("Failed to fetch staff");
      }
    },
  },
  Mutation: {
    addStaff: async (_, { name, age, qualification, contact, email }) => {
      try {
        const newStaff = new Staff({
          name,
          age,
          qualification,
          contact,
          email,
        });
        return await newStaff.save();
      } catch (error) {
        throw new Error("Failed to add staff");
      }
    },
    updateStaff: async (
      _,
      { id, name, age, qualification, contact, email }
    ) => {
      try {
        return await Staff.findByIdAndUpdate(
          id,
          { name, age, qualification, contact, email },
          { new: true }
        );
      } catch (error) {
        throw new Error("Failed to update staff");
      }
    },
    deleteStaff: async (_, { id }) => {
      try {
        await Staff.findByIdAndDelete(id);
        return "Staff deleted successfully";
      } catch (error) {
        throw new Error("Failed to delete staff");
      }
    },
  },
};

module.exports = staffResolver;
