import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

const AnswerDisplay = ({ answer }) => {
  return (
    <Card className="max-w-xl mx-auto mt-6 shadow-lg">
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <SpeakerNotesIcon color="primary" />
          <Typography variant="h6" component="div" className="font-semibold text-gray-800">
            Answer
          </Typography>
        </div>
        <Typography variant="body1" className="text-gray-700 whitespace-pre-line">
          {answer || "No answer yet."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AnswerDisplay;
