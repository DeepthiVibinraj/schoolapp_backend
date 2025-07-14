// const { ApolloServer } = require("apollo-server");
// const dotenv = require("dotenv");

// const connectDB = require("./config/db");
// const studentTypeDef = require("./graphql/typedefs/studentTypeDef");
// const userTypeDef = require("./graphql/typedefs/userTypeDef");
// const studentResolver = require("./graphql/resolvers/studentResolver");
// const userResolver = require("./graphql/resolvers/userResolver");

// const staffTypeDef = require("./graphql/typedefs/staffTypeDef");

// const staffResolver = require("./graphql/resolvers/staffResolver");

// const subjectTypeDef = require("./graphql/typedefs/subjectTypeDef");

// const subjectResolver = require("./graphql/resolvers/subjectResolver");
// const classTypeDef = require("./graphql/typedefs/classTypeDef");

// const classResolver = require("./graphql/resolvers/classResolver");
// const timeTableTypeDef = require("./graphql/typedefs/timeTableTypeDef");

// const timeTableResolver = require("./graphql/resolvers/timeTableResolver");

// const typeDefs = [
//   studentTypeDef,
//   userTypeDef,
//   staffTypeDef,
//   subjectTypeDef,
//   classTypeDef,
//   timeTableTypeDef,
// ];
// const resolvers = [
//   studentResolver,
//   userResolver,
//   staffResolver,
//   subjectResolver,
//   classResolver,
//   timeTableResolver,
// ];

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Create Apollo Server
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   cache: "bounded",
//   context: ({ req }) => {
//     // Add any authentication logic here if needed
//     return { req };
//   },
// });

// // Start the server
// server.listen({ port: process.env.PORT || 10000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const studentTypeDef = require("./graphql/typedefs/studentTypeDef");
const userTypeDef = require("./graphql/typedefs/userTypeDef");
const studentResolver = require("./graphql/resolvers/studentResolver");
const userResolver = require("./graphql/resolvers/userResolver");
const staffTypeDef = require("./graphql/typedefs/staffTypeDef");
const staffResolver = require("./graphql/resolvers/staffResolver");
const subjectTypeDef = require("./graphql/typedefs/subjectTypeDef");
const subjectResolver = require("./graphql/resolvers/subjectResolver");
const classTypeDef = require("./graphql/typedefs/classTypeDef");
const classResolver = require("./graphql/resolvers/classResolver");
const timeTableTypeDef = require("./graphql/typedefs/timeTableTypeDef");
const timeTableResolver = require("./graphql/resolvers/timeTableResolver");
const homeworkTypeDef = require("./graphql/typedefs/homeworkTypeDef");
const homeworkResolver = require("./graphql/resolvers/homeworkResolver");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const typeDefs = [
  studentTypeDef,
  userTypeDef,
  staffTypeDef,
  subjectTypeDef,
  classTypeDef,
  timeTableTypeDef,
  homeworkTypeDef,
];

const resolvers = [
  studentResolver,
  userResolver,
  staffResolver,
  subjectResolver,
  classResolver,
  timeTableResolver,
  homeworkResolver,
];

// // Create Apollo Server
// const admin = require("./firebaseAdmin");
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   cache: "bounded",
//   context: ({ req }) => {
//     return { req };
//   },
//   cors: {
//     origin: "*", // Allow all origins (for development only)
//     credentials: true,
//   },
// });

// const admin = require("./firebase_admin");

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   introspection: true,
//   cache: "bounded",
//   context: async ({ req }) => {
//     const token = req.headers.authorization?.split("Bearer ")[1];

//     if (!token) {
//       throw new Error("Unauthorized: No token provided");
//     }

//     try {
//       const decodedToken = await admin.auth().verifyIdToken(token);
//       const uid = decodedToken.uid;

//       return { uid, decodedToken }; // You can now access `uid` inside resolvers
//     } catch (err) {
//       console.error("Token verification failed:", err);
//       throw new Error("Unauthorized: Invalid token");
//     }
//   },
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });
//const admin = require("firebase-admin");
const admin = require("./firebase_admin");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";

    try {
      if (token.startsWith("Bearer ")) {
        const idToken = token.split("Bearer ")[1];
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return { uid: decodedToken.uid }; // Pass uid here
      }
    } catch (error) {
      console.log("Invalid token:", error);
      // Optionally throw or return context without uid
    }
    return {};
  },
});

// const admin = require("./firebase_admin");

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({ req }) => {
//     const authHeader = req.headers.authorization || "";
//     const token = authHeader.split("Bearer ")[1];
//     if (!token) throw new Error("Unauthorized: No token provided");

//     const decodedToken = await admin.auth().verifyIdToken(token);
//     return { user: decodedToken };
//   },
// });

// Start the server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
