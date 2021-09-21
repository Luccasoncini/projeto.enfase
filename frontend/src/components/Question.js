import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

export const GET_QUESTION_BY_ID = gql`
  query GetQuestion($id: ID!) {
    question(id: $id) {
      id
      questionDescription
      Options {
        optionDescription
        isTrue
      }
    }
  }
`;

const Question = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_QUESTION_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App-viewbox">
      <p>
        <strong>Pergunta: </strong>
        {data.question.questionDescription}
      </p>
      <p>
        <strong>Respostas: </strong>
        {data.question.Options.optionDescription}
      </p>
      <p>
        <strong>Verdadeiro: </strong>
        {data.question.Options.isTrue}
      </p>
      <p className="App-close-btn">
        <Link to="/">
          <button>✖</button>
        </Link>
      </p>
      <p>
        <Link to={`/editQuestion/${id}`}>
          <button>Editar</button>
        </Link>
      </p>
    </div>
  );
};

export default Question;
