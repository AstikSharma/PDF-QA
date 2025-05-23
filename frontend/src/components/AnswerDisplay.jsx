import React from 'react';

const AnswerDisplay = ({ answer }) => {
  return (
    <div className="whitespace-pre-line">
      {answer || "No answer yet."}
    </div>
  );
};

export default AnswerDisplay;
