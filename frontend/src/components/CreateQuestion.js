import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { GET_QUESTIONS } from "./Questions";

const CREATE_QUESTION = gql`
  mutation UpdateQuestion($questionDescription: String!, $optionDescription: String!, $isTrue: Boolean!) {
    createQuestion(
      question: { questionDescription: $questionDescription, Options: [{ optionDescription: $optionDescription, isTrue: $isTrue }] }
    ) {
      id
      questionDescription
      Options {
        optionDescription
        isTrue
      }
    }
  }
`;

const CreateQuestion = () => {
  const history = useHistory();

  const [createQuestion, { loading, error }] = useMutation(CREATE_QUESTION, {
    update(cache, { data: { createQuestion } }) {
      const { questions } = cache.readQuery({ query: GET_QUESTIONS });
      cache.writeQuery({
        query: GET_QUESTIONS,
        data: { questions: questions.concat([createQuestion]) },
      });
    },
    onCompleted() {
      history.push(`/`);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let questionDescriptionInput;
  let optionDescriptionInput;
  let isTrueInput;

  return (
    <div>
      <form
        className="App-viewbox"
        onSubmit={(e) => {
          e.preventDefault();

          createQuestion({
            variables: {
              questionDescription: questionDescriptionInput.value,
              optionDescription: optionDescriptionInput.value,
              isTrue: isTrueInput.value === "true",
            },
          });

          questionDescriptionInput.value = "";
          optionDescriptionInput.value = "";
          isTrueInput.value = "";
        }}
      >
        <p>
          <label>
            Qual a pergunta?
            <br />
            <input
              className="option"
              type="text"
              name="questionDescription"
              ref={(node) => {
                questionDescriptionInput = node;
              }}
            />
          </label>
        </p>
          <ul className="flex-container">              
            Respostas
            <div className="flex-row">
              <input
                className="option"
                type="text"
                name="optionDescription"
                ref={(node) => {
                  optionDescriptionInput = node;
                }}
              />
              <input
                className="option"
                type="text"
                name="isTrue"
                ref={(node) => {
                  isTrueInput = node;
                }}
              />
            </div>
            <div className="flex-row">  
              <input
                className="option"
                type="text"
                name="optionDescription"
                ref={(node) => {
                  optionDescriptionInput = node;
                }}
              />
              <input
                className="option"
                type="text"
                name="isTrue"
                ref={(node) => {
                  isTrueInput = node;
                }}
              />
            </div>
            <div className="flex-row">  
              <input
                className="option"
                type="text"
                name="optionDescription"
                ref={(node) => {
                  optionDescriptionInput = node;
                }}
              />
              <input
                className="option"
                type="text"
                name="isTrue"
                ref={(node) => {
                  isTrueInput = node;
                }}
              />
            </div>
            <div className="flex-row">  
              <input
                className="option"
                type="text"
                name="optionDescription"
                ref={(node) => {
                  optionDescriptionInput = node;
                }}
              />
              <input
                className="option"
                type="text"
                name="isTrue"
                ref={(node) => {
                  isTrueInput = node;
                }}
              />
            </div>  
          </ul>
        <p className="App-close-btn">
          <Link to="/">
            <button>X</button>
          </Link>
        </p>
        <p>
          <button className="newQuestion" type="submit">
            Salvar
          </button>
        </p>
      </form>
    </div>
  );
};

export default CreateQuestion;
