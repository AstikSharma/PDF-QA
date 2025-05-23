# PDF QA Application

## Project Overview

This is a web application that allows users to upload PDF documents and ask questions about their content. The application consists of a backend API built with FastAPI and a frontend built with React.

## Setup Instructions

To set up and run the application locally, follow these steps:

### Prerequisites

*   Python 3.7+
*   Node.js and npm

### Clone the repository:
1. Run the following command in your terminal:
   ```bash
    git clone https://github.com/AstikSharma/PDF-QA.git
   cd PDF-QA
   ```

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment (recommended):
    ```bash
    python -m venv venv
    ```
3.  Activate the virtual environment:
    *   On Windows:
        ```bash
        .\venv\Scripts\activate
        ```
    *   On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```
    *   If none of the above work then (bash in windows):
        ```bash
        source venv/Scripts/activate
        ```
        
4.  Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```
5.  Create a `.env` file in the `backend` directory and add any necessary environment variables:
    ```bash
    DATABASE_URL=postgresql://username:password@localhost:5432/pdfqa
    PDF_STORAGE_PATH=pdf_storage
    OPENAI_API_KEY=your_OpenAI_API_Key
    ```
7.  Run the backend application:
    ```bash
    uvicorn app.main:app --reload
    ```
    The backend API will be running at `http://127.0.0.1:8000`.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend application will be running at `http://localhost:5173` (or another port if 5173 is in use).

## API Documentation

The backend provides the following API endpoints:

*   **`POST /upload/`**: Upload a PDF file.
    *   **Request Body**: `multipart/form-data` with a file field named `file`.
    *   **Response**: JSON object confirming the upload and providing a document ID.
*   **`POST /question/`**: Ask a question about an uploaded document.
    *   **Request Body**: JSON object with `document_id` (string) and `question` (string).
    *   **Response**: JSON object containing the answer to the question.

Detailed API documentation (Swagger UI) is available at `http://127.0.0.1:8000/docs` when the backend is running.

## Application Architecture

The application follows a client-server architecture:

*   **Frontend**: A React application that provides the user interface for uploading PDFs and asking questions. It interacts with the backend API to perform these actions.
*   **Backend**: A FastAPI application that handles PDF uploads, processes the documents, and answers questions using a natural language processing (NLP) model. It interacts with a database to store document information and potentially the processed content. The NLP processing is handled by the `nlp_processor.py` module, and PDF extraction is done by `pdf_extractor.py`. Document information is managed by the `document.py` model and stored using the `database.py` module. API endpoints are defined in the `api/endpoints` directory.
