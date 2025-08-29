const { gql } = require("apollo-server");

const classTypeDef = gql`
  type Class {
    id: ID!
    name: String!
  }

  type Query {
    getClasses: [Class]
    getClassById(id: ID!): Class
  }

  type Mutation {
    addClass(name: String!): Class
    updateClass(id: ID!, name: String): Class
    deleteClass(id: ID!): String
  }
`;

module.exports = classTypeDef;
