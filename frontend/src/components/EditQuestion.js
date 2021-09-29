import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams, Link, useHistory } from "react-router-dom";
import { GET_QUESTION_BY_ID } from "./Question";

const UPDATE_QUESTION = gql`
  mutation updateQuestion(
    $id: String!
    $questionDescription: String
    $optionDescription: String
    $isTrue: Boolean
  ) {
    updateQuestion(
      id: $id
      question: { questionDescription: $questionDescription, Options: { optionDescription: $optionDescription, isTrue: $isTrue } }
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
  if (error || mutationError) return <p>Error :(</p>;

  let questionDescriptionInput;
  let optionDescriptionInput;
  let isTrueInput;

  return (
    <div>
      <form
        className="App-viewbox"
        onSubmit={(e) => {
          e.preventDefault();

          updateQuestion({
            variables: {
              id: data.question.id,
              questionDescription: questionDescriptionInput.value,
              optionDescription: optionDescriptionInput.value,
              isTrue: isTrueInput.value,
            },
          });
        }}
      >
        <p>
          <label>
            Pergunta
            <br />
            <input
              type="text"
              name="questionDescription"
              defaultValue={data.question.questionDescription}
              ref={(node) => {
                questionDescriptionInput = node;
              }}
            />
          </label>
        </p>
        <p>
          <label>
            <ul>
              {data.question.Options.map(({ optionDescription, isTrue }) => ( 
                <>  
                  <input
                    type="text"
                    name="optionDescription"
                    defaultValue={optionDescription}
                    ref={(node) => {
                      optionDescriptionInput = node;
                    }}
                  />
                  <input
                    type="text"
                    name="isTrue"
                    defaultValue={isTrue}
                    ref={(node) => {
                      isTrueInput = node;
                    }}
                  />
                </>  
            ))}
            </ul>
            <br />
 
          </label>
        </p>
        <p className="App-close-btn">
          <Link to="/">
            <button type="button">X</button>
          </Link>
        </p>
        <p>
          <button className="App-btn" type="submit">
            Salvar
          </button>
        </p>
      </form>
    </div>
  );
};

export default EditQuestion;
