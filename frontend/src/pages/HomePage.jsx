import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import QuestionForm from "../components/QuestionForm";
import AnswerDisplay from "../components/AnswerDisplay";
import logo from '../assets/logo.png';
import fileIcon from '../assets/fileIcon.png';

const HomePage = () => {
  const [documentId, setDocumentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleUploadSuccess = (id) => {
    setDocumentId(id);
    setMessages([]);
    setError(null);
  };
  const handleFileSelect = (name) => {
    setFileName(name);
  };
  const handleQuestionSubmit = (question) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: question }]);
  };

  const handleAnswer = (answer) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: answer }]);
  };

  const handleError = (errMsg) => {
    setError(errMsg);
  };

  return (
    <div className="flex flex-col h-screen bg-white w-full">
      <header className="flex items-center justify-between p-4 shadow-sm h-16">
        <div className="flex items-center ml-6 overflow-hidden">
          <img
            src={logo}
            alt="AI Planet Logo"
            className="h-14 sm:w-50 w-25 object-contain"
          />
        </div>
        <div className="flex items-center">
          {fileName && (
            <>
              <div
                className="flex items-center justify-center overflow-hidden border-2 border-green-500 rounded-[5px] py-1.5 px-1 mr-2"
              >
                <img
                  src={fileIcon}
                  alt="File icon"
                  className="h-4 w-4"
                />
              </div>
              <span className="mr-4 sm:mr-8 text-green-600 text-sm truncate font-semibold">
                {fileName}
              </span>
            </>
          )}
          <UploadForm
            onUploadSuccess={handleUploadSuccess}
            onFileSelect={handleFileSelect}
          />
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 w-full mt-16">
        <div className="w-[80%] mx-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start w-full">
              <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3"
                style={{ backgroundColor: message.sender === "bot" ? "#10B981" : "#8B5CF6" }}>
                {message.sender === "bot" ? "ai" : "S"}
              </div>
              <div className="flex-grow rounded-lg p-3 mb-8">
                {message.sender === "bot" ?
                  <AnswerDisplay answer={message.text} loading={false} /> :
                  <div className="text-gray-800">{message.text}</div>
                }
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-red-600 w-[80%] mx-auto">{error}</p>}
      </main>

      <footer className="pb-10 w-full">
        <div className="w-[80%] mx-auto">
          <QuestionForm
            documentId={documentId}
            onAnswer={handleAnswer}
            onError={handleError}
            onQuestionSubmit={handleQuestionSubmit}
          />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;