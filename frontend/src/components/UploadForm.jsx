import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { CircularProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { API_BASE_URL } from "../config";
import plusIcon from "../assets/plusIcon.png"

const UploadForm = ({ onUploadSuccess, onFileSelect }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadAction = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file) return;
      if (onFileSelect) {
        onFileSelect(file.name);
      }
      if (file.type !== "application/pdf") {
        setError("Only PDF files are supported.");
        return;
      }

      // Proceed with upload
      setError(null);
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE_URL}/api/pdf/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "Upload failed");
        }

        const data = await response.json();
        onUploadSuccess(data.document_id);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setUploading(false);
      }
    }
    else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUploadAction}
        disabled={uploading}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        variant="outlined"
        onClick={handleUploadAction}
        disabled={uploading}
        startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : null}
        sx={{
          minWidth: 'auto',
          p: 1,
          px: { sm: 8 },
          mr: { xs: 1, sm: 9 },
          borderRadius: '10px',
          border: { sm: '2px solid black', xs: '1px solid black' },
          '& .MuiButton-startIcon': {
            margin: { xs: 0, sm: 'initial' }
          }
        }}
      >
        {!uploading && (
          <span>
            <img
              src={plusIcon}
              alt="Upload"
              className="h-4 w-4 sm:mr-4"
            />
          </span>
        )}
        <span className="hidden sm:inline text-black">
          {uploading ? "Uploading..." : "Upload PDF"}
        </span>

      </Button>
      {error && <p className="text-red-600 text-sm font-medium mt-2">{error}</p>}
      {uploading && <LinearProgress className="mt-2" />}
    </div>
  );
};

export default UploadForm;