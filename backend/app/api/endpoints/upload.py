import os
import shutil
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils.pdf_extractor import extract_text_from_pdf
from app.database import insert_document_metadata

router = APIRouter()

UPLOAD_DIR = "pdf_storage"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        file_path = os.path.join(UPLOAD_DIR, f"{timestamp}_{file.filename}")
        
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # Extract text
        text = extract_text_from_pdf(file_path)

        # Save document metadata to the database
        document_id = insert_document_metadata(file.filename, file_path, text)

        return {"message": "PDF uploaded successfully.", "document_id": document_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
