import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import QuestionForm from "../components/QuestionForm";
import AnswerDisplay from "../components/AnswerDisplay";

const HomePage = () => {
  const [documentId, setDocumentId] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);

  const handleUploadSuccess = (id) => {
    setDocumentId(id);
    setAnswer(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">PDF Question Answering App</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Upload PDF</h2>
        <UploadForm onUploadSuccess={handleUploadSuccess} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Ask a Question</h2>
        <QuestionForm
          documentId={documentId}
          onAnswer={(ans) => {
            setAnswer(ans);
            setError(null);
          }}
          onError={(errMsg) => {
            setError(errMsg);
            setAnswer(null);
          }}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Answer</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <AnswerDisplay answer={answer} loading={false} />
      </section>
    </div>
  );
};

export default HomePage;
