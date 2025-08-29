const { gql } = require("apollo-server");

const staffTypeDef = gql`
  type Staff {
    id: ID!
    name: String!
    age: Int!
    qualification: String!
    contact: String!
    email: String!
  }

  type Query {
    getStaffs: [Staff]
    getStaffById(id: ID!): Staff
    getStaffByEmail(email: String!): [Staff]
  }

  type Mutation {
    addStaff(
      name: String!
      age: Int!
      qualification: String!
      contact: String!
      email: String!
    ): Staff
    updateStaff(
      id: ID!
      name: String
      age: Int
      qualification: String
      contact: String
      email: String
    ): Staff
    deleteStaff(id: ID!): String
  }
`;

module.exports = staffTypeDef;
