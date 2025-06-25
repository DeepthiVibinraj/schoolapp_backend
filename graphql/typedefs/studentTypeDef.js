const { gql } = require("apollo-server");

const studentTypeDef = gql`
  type Student {
    id: ID!
    name: String!
    age: Int!
    class: String!
    contact: String!
    email: String!
  }

  type Query {
    getStudents: [Student]
    getStudentById(id: ID!): Student
    getStudentByEmail(email: String!): [Student]
  }

  type Mutation {
    addStudent(
      name: String!
      age: Int!
      class: String!
      contact: String!
      email: String!
    ): Student
    updateStudent(
      id: ID!
      name: String
      age: Int
      class: String
      contact: String
      email: String
    ): Student
    deleteStudent(id: ID!): String
  }
`;

module.exports = studentTypeDef;
