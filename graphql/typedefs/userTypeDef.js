const { gql } = require("apollo-server");

const userTypeDef = gql`
  type User {
    id: ID!
    userName: String!
    userEmail: String!
    userRole: String!
  }

  type Mutation {
    addUser(userName: String!, userEmail: String!, userRole: String): User
  }
`;

module.exports = userTypeDef;
