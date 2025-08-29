const Student = require("../models/student");

const studentResolver = {
  Query: {
    getStudents: async () => {
      try {
        const students = await Student.find(); // MongoDB query
        return students;
      } catch (error) {
        console.error("Failed to fetch students:", error);
        throw new Error("Failed to fetch students");
      }
    },
    getStudentById: async (_, { id }) => {
      try {
        return await Student.findById(id);
      } catch (error) {
        console.error("Failed to fetch student:", error);
        throw new Error("Failed to fetch student");
      }
    },

    getStudentByEmail: async (_, { email }) => {
      try {
        return await Student.find({ email });
      } catch (error) {
        console.error("Failed to fetch students:", error);
        throw new Error("Failed to fetch students");
      }
    },
  },
  Mutation: {
    addStudent: async (
      _,
      { name, age, class: studentClass, contact, email }
    ) => {
      try {
        const newStudent = new Student({
          name,
          age,
          class: studentClass,
          contact,
          email,
        });
        return await newStudent.save();
      } catch (error) {
        console.error("Failed to add student:", error);
        throw new Error("Failed to add student");
      }
    },
    updateStudent: async (
      _,
      { id, name, age, class: studentClass, contact, email }
    ) => {
      try {
        return await Student.findByIdAndUpdate(
          id,
          { name, age, class: studentClass, contact, email },
          { new: true }
        );
      } catch (error) {
        throw new Error("Failed to update student");
      }
    },
    deleteStudent: async (_, { id }) => {
      try {
        await Student.findByIdAndDelete(id);
        return "Student deleted successfully";
      } catch (error) {
        throw new Error("Failed to delete student");
      }
    },
  },
};

module.exports = studentResolver;
