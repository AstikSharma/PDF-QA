import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { InputBase, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import { API_BASE_URL } from "../config";

const QuestionForm = ({ documentId, onAnswer, onError, onQuestionSubmit }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!documentId) {
      onError && onError("Please upload a PDF first.");
      return;
    }
    if (!question.trim()) return;

    onQuestionSubmit && onQuestionSubmit(question); // Pass the question to HomePage
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
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: '10px',
          boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: 'rgba(0, 0, 0, 0.87)', // Darker text color
            '& .MuiInputBase-input': {
              color: 'rgba(0, 0, 0, 0.87)', // Ensures the text is dark
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(0, 0, 0, 0.6)', // Darker placeholder
              opacity: 1, // Ensure full opacity
            }
          }}
          placeholder="Send a message..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          inputProps={{ 'aria-label': 'send a message' }}
        />
        <IconButton
          type="submit"
          sx={{ p: '10px' }}
          color="primary"
          disabled={loading || !question.trim()}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
        </IconButton>
      </Paper>
  );
};

export default QuestionForm;
