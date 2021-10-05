const { gql } = require("apollo-server");

const types = gql`
  type Question {
    id: ID
    questionDescription: String
    Options: [Option]
  }

  type Option {
    optionDescription: String
    isTrue: Boolean
  }
`;

module.exports = types;
