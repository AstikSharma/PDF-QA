import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { API_BASE_URL } from "../config";

const QuestionForm = ({ documentId, onAnswer, onError }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!documentId) {
      onError && onError("Please upload a PDF first.");
      return;
    }
    if (!question.trim()) return;

    setLoading(true);
    onError && onError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/question/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_id: documentId, question }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to get answer");
      }

      const data = await response.json();
      onAnswer && onAnswer(data.answer);
      setQuestion("");
    } catch (err) {
      onError && onError(err.message);
      onAnswer && onAnswer(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-6 space-y-4">
      <TextField
        label="Ask your question"
        variant="outlined"
        fullWidth
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading || !question.trim()}
        fullWidth
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? "Asking..." : "Ask"}
      </Button>
    </form>
  );
};

export default QuestionForm;
