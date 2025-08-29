const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const admin = require("./firebase_admin");

// GraphQL TypeDefs and Resolvers
const studentTypeDef = require("./graphql/typedefs/studentTypeDef");
const userTypeDef = require("./graphql/typedefs/userTypeDef");
const staffTypeDef = require("./graphql/typedefs/staffTypeDef");
const subjectTypeDef = require("./graphql/typedefs/subjectTypeDef");
const classTypeDef = require("./graphql/typedefs/classTypeDef");
const timeTableTypeDef = require("./graphql/typedefs/timeTableTypeDef");
const homeworkTypeDef = require("./graphql/typedefs/homeworkTypeDef");
const eventTypeDef = require("./graphql/typedefs/eventTypeDef");

const studentResolver = require("./graphql/resolvers/studentResolver");
const userResolver = require("./graphql/resolvers/userResolver");
const staffResolver = require("./graphql/resolvers/staffResolver");
const subjectResolver = require("./graphql/resolvers/subjectResolver");
const classResolver = require("./graphql/resolvers/classResolver");
const timeTableResolver = require("./graphql/resolvers/timeTableResolver");
const homeworkResolver = require("./graphql/resolvers/homeworkResolver");
const eventResolver = require("./graphql/resolvers/eventResolver");

// Load .env variables
dotenv.config();

// Connect to DB
connectDB();

// Collect TypeDefs and Resolvers
const typeDefs = [
  studentTypeDef,
  userTypeDef,
  staffTypeDef,
  subjectTypeDef,
  classTypeDef,
  timeTableTypeDef,
  homeworkTypeDef,
  eventTypeDef,
];

const resolvers = [
  studentResolver,
  userResolver,
  staffResolver,
  subjectResolver,
  classResolver,
  timeTableResolver,
  homeworkResolver,
  eventResolver,
];

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";
    let uid = null;

    try {
      if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.split("Bearer ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        uid = decodedToken.uid;
      }
    } catch (error) {
      console.warn("Token verification failed:", error?.message || error);
    }

    return { uid };
  },
  introspection: true,
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Start the server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
