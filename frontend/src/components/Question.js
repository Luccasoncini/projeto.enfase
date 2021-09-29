import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import Options from "./Options";

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
    variables: { id }});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
  <>
    <div className="App-viewbox">
      <p>
        {data.question.questionDescription}
      </p>
     
      <ul>
       <Options/>
      </ul>
      
      <p className="App-close-btn">
        <Link to="/">
          <button>✖</button>
        </Link>
      </p>
    </div>
  </>  
  );
};

export default Question;
