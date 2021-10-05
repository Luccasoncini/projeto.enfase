import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { GET_QUESTIONS } from "./Questions";

const CREATE_QUESTION = gql`
  mutation CreateQuestion($questionDescription: String!, $Options: [OptionsInput] ) {
    createQuestion(
      question: { 
        questionDescription: $questionDescription, 
        Options:  $Options 
      }
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
  if (error) return <p>Error ;(</p>
 

  let questionDescriptionInput;

  let optionDescriptionInput;
  let isTrueInput;

  let optionDescriptionInput1;
  let isTrueInput1;

  let optionDescriptionInput2;
  let isTrueInput2;

  let optionDescriptionInput3;
  let isTrueInput3;

  return (
    <div>
      <form
        className="App-viewbox"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(questionDescriptionInput)
          createQuestion({
            variables: {
              questionDescription: questionDescriptionInput.value,
              Options: [
                {
                  optionDescription: optionDescriptionInput.value,
                  isTrue: isTrueInput.value === "true"
                },
                {
                  optionDescription: optionDescriptionInput1.value,
                  isTrue: isTrueInput1.value === "true"
                },
                {
                  optionDescription: optionDescriptionInput2.value,
                  isTrue: isTrueInput2.value === "true"
                },
                {
                  optionDescription: optionDescriptionInput3.value,
                  isTrue: isTrueInput3.value === "true"
                },
              ]        
            },
          });

          questionDescriptionInput.value = "";

          optionDescriptionInput.value = "";
          isTrueInput.value = "";

          optionDescriptionInput1.value = "";
          isTrueInput1.value = "";

          optionDescriptionInput2.value = "";
          isTrueInput2.value = "";

          optionDescriptionInput3.value = "";
          isTrueInput3.value = "";

        }}
      >
        <p>''
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
                  optionDescriptionInput1 = node;
                }}
              />
              <input
                className="option"
                type="text"
                name="isTrue"
                ref={(node) => {
                  isTrueInput1 = node;
                }}
              />
            </div>
            <div className="flex-row">  
              <input
                className="option"
                type="text"
                name="optionDescription"
                ref={(node) => {
                  optionDescriptionInput2 = node;
                }}
              />
              <input
                className="option"
                type="text"
                name="isTrue"
                ref={(node) => {
                  isTrueInput2 = node;
                }}
              />
            </div>
            <div className="flex-row">  
              <input
                className="option"
                type="text"
                name="optionDescription"
                ref={(node) => {
                  optionDescriptionInput3 = node;
                }}
              />
              <input
                className="option"
                type="text"
                name="isTrue"
                ref={(node) => {
                  isTrueInput3 = node;
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
