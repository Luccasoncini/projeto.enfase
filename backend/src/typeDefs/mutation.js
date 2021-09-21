const { gql } = require("apollo-server");

const mutation = gql`
  type Mutation {
    createQuestion(question: QuestionInput): Question
    updateQuestion(id: String, question: QuestionInput): Question
    deleteQuestion(id: String): Question
  }

  input QuestionInput {
    questionDescription: String
    Options: [OptionsInput]
  }

  input OptionsInput {
    optionDescription: String
    isTrue: Boolean
  }
`;

module.exports = mutation;
