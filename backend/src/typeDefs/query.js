const { gql } = require("apollo-server");

const query = gql`
  type Query {
    questions: [Question]
    question(id: ID!): Question
  }
`;

module.exports = query;
