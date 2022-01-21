import React from "react";
import { extractFeedback } from "../api/feedback";
import { buildFeedbackPath } from "./../api/feedback";

const FeedbackPage = (props) => {
  return (
    <ul>
      {props.feedbackItem.map((item) => (
        <li key={item.id}>
          <h3>{item.email}</h3>
          <div>{item.feedback}</div>
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItem: data,
    },
  };
}

export default FeedbackPage;
