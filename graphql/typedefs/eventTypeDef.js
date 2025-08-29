const { gql } = require("apollo-server");

const eventTypeDef = gql`
  type Event {
    id: ID!
    eventName: String!
    eventDate: String!
    venue: String!
  }

  type Query {
    getEvents: [Event]
    getEventById(id: ID!): Event
  }

  type Mutation {
    addEvent(eventName: String!, eventDate: String!, venue: String!): Event
    updateEvent(
      id: ID!
      eventName: String
      eventDate: String
      venue: String
    ): Event
    deleteEvent(id: ID!): String
  }
`;

module.exports = eventTypeDef;
