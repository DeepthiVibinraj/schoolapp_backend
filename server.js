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

const typeDefs = [
  studentTypeDef,
  userTypeDef,
  staffTypeDef,
  subjectTypeDef,
  classTypeDef,
  timeTableTypeDef,
];
const resolvers = [
  studentResolver,
  userResolver,
  staffResolver,
  subjectResolver,
  classResolver,
  timeTableResolver,
];

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add any authentication logic here if needed
    return { req };
  },
});

// Start the server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
