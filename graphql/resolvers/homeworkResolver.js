// const Homework = require("../models/homework");
// const mongoose = require("mongoose");

// const homeworkResolver = {
//   Query: {
//     getHomework: async () => {
//       return await Homework.find();
//     },
//     getHomeworkByClassLevel: async (_, { classLevel }) => {
//       return await Homework.find({
//         classLevel: "67907d25903e0e8707060101",
//         // classLevel: new mongoose.Types.ObjectId(classLevel),
//       });
//     },
//   },
//   Mutation: {
//     addHomework: async (_, { classLevel, subjectHomeworks }) => {
//       const newHomework = new Homework({ classLevel, subjectHomeworks });
//       return await newHomework.save();
//     },
//     deleteHomework: async (_, { id }) => {
//       const result = await Homework.findByIdAndDelete(id);
//       return !!result;
//     },
//   },
// };

// // module.exports = homeworkResolver;
// // const Homework = require("../models/homework");
// // const mongoose = require("mongoose");

// // const homeworkResolver = {
// //   Query: {
// //     getHomework: async () => {
// //       return await Homework.find();
// //     },
// //     getHomeworkByClassLevel: async (_, { classLevel }) => {
// //       if (!mongoose.Types.ObjectId.isValid(classLevel)) {
// //         throw new Error("Invalid classLevel ID");
// //       }
// //       return await Homework.find({
// //         classLevel: "67907d25903e0e8707060101",
// //         classLevel: new mongoose.Types.ObjectId(classLevel),
// //       });
// //     },
// //   },
// //   Mutation: {
// //     addHomework: async (_, { classLevel, subjectHomeworks }) => {
// //       const newHomework = new Homework({ classLevel, subjectHomeworks });
// //       return await newHomework.save();
// //     },
// //     deleteHomework: async (_, { id }) => {
// //       const result = await Homework.findByIdAndDelete(id);
// //       return !!result;
// //     },
// //   },
// // };

// // module.exports = homeworkResolver;
const Homework = require("../models/homework");

const homeworkResolver = {
  Query: {
    getHomework: async () => {
      return await Homework.find();
    },

    getHomeworkByClassLevel: async (_, { classLevel }) => {
      console.log(
        "///////////////////////////////////////////////////////////////"
      );
      console.log("Fetching homework for class level:", classLevel);

      // ✅ Since classLevel is a string now (e.g., "5D"), no need to convert to ObjectId
      return await Homework.find({ classLevel: classLevel });
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
