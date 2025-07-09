const { gql } = require("apollo-server");

const homeworkTypeDef = gql`
  type SubjectHomework {
    subject: String!
    homework: String!
  }

  input SubjectHomeworkInput {
    subject: String!
    homework: String!
  }

  type Homework {
    id: ID!
    classLevel: String!
    subjectHomeworks: [SubjectHomework!]!
  }

  type Query {
    getHomework: [Homework!]!
  }

  type Mutation {
    addHomework(
      classLevel: String!
      subjectHomeworks: [SubjectHomeworkInput!]!
    ): Homework!
    deleteHomework(id: ID!): Boolean
  }
`;

module.exports = homeworkTypeDef;
