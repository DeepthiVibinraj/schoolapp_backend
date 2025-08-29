const { gql } = require("apollo-server");

const subjectTypeDef = gql`
  type Subject {
    id: ID!
    name: String!
  }

  type Query {
    getSubjects: [Subject]
    getSubjectById(id: ID!): Subject
  }

  type Mutation {
    addSubject(name: String!): Subject
    updateSubject(id: ID!, name: String): Subject
    deleteSubject(id: ID!): String
  }
`;

module.exports = subjectTypeDef;
