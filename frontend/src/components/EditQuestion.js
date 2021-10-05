import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams, Link, useHistory } from "react-router-dom";
import { GET_QUESTION_BY_ID } from "./Question";

const UPDATE_QUESTION = gql`
  mutation updateQuestion(
    $id: String!
    $question: QuestionInput!

  ) {
    updateQuestion(
      id: $id,
      question: $question 
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

const EditQuestion = () => {
  const { id } = useParams();
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_QUESTION_BY_ID, {
    variables: { id },
  });
  const [updateQuestion, { error: mutationError }] = useMutation(UPDATE_QUESTION, {
    onCompleted() {
      history.push(`/`);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error || mutationError) return <p> Erro:(</p>;

  let questionDescriptionInput;
  let optionDescriptionInput = [];
  let isTrueInput = [];

  return (
    <div>
      <form
        className="App-viewbox"
        onSubmit={(e) => {
          e.preventDefault();
          const question = {
            questionDescription: questionDescriptionInput.value,
            Options: optionDescriptionInput.map((option, index)=>{
              return {
                optionDescription: option.value,
                isTrue: isTrueInput[index].value === "true"
              }
            })
          }
           updateQuestion({
            variables: {
              id: data.question.id,
              question
            },
          }); 
        }}
      >
        <p>
          <label>Pergunta</label>  
            <br />
            <input
              className="option"
              type="text"
              name="questionDescription"
              defaultValue={data.question.questionDescription}
              ref={(node) => {
                questionDescriptionInput = node;
              }}
            />
          
        </p>
        <div>
          <label>Respostas</label>
            <ul className="flex-container">
              {data.question.Options.map(({ optionDescription, isTrue },index) => ( 
                <div className="flex-row">  
                  <input
                    className="option"
                    type="text"
                    name="optionDescription"
                    defaultValue={optionDescription}
                    ref={(node) => {
                      optionDescriptionInput[index] = node;
                    }}
                  />
                  <input
                    className="option"
                    type="text"
                    name="isTrue"
                    defaultValue={isTrue}
                    ref={(node) => {
                      isTrueInput[index] = node;
                    }}
                  />
                </div>  
            ))}
            </ul>
        </div>
        <p className="App-close-btn">
          <Link to="/">
            <button type="button">X</button>
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

export default EditQuestion;
