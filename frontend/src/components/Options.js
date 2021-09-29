import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

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

const Options = () => {

  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_QUESTION_BY_ID, {
    variables: { id }});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <ul className="flex-container">
        {data.question.Options.map(({ optionDescription }) => ( 
            
        <button className="option">{optionDescription}</button>

        ))}
      </ul>
    </>
  );
};

export default Options;
