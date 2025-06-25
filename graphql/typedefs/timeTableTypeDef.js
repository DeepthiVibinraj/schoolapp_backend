const { gql } = require("apollo-server");

const timeTableTypeDef = gql`
  type TimeTable {
    id: ID!
    className: String!
    schedule: [DaySchedule!]!
  }

  type DaySchedule {
    day: String!
    periods: [String!]!
  }

  input DayScheduleInput {
    day: String!
    periods: [String!]!
  }

  type Query {
    timeTables: [TimeTable!]!
    timeTable(id: ID!): TimeTable
    getTimetableByClass(className: String!): TimeTable
  }

  type Mutation {
    addTimeTable(className: String!, schedule: [DayScheduleInput!]!): TimeTable!
    updateTimeTable(
      id: ID!
      className: String!
      schedule: [DayScheduleInput!]!
    ): TimeTable!
    deleteTimeTable(id: ID!): TimeTable!
  }
`;

module.exports = timeTableTypeDef;
