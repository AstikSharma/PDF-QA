from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from app.core.nlp_processor import process_question

router = APIRouter()

class QuestionRequest(BaseModel):
    document_id: int
    question: str

@router.post("/ask")
async def ask_question(payload: QuestionRequest):
    try:
        answer = process_question(payload.document_id, payload.question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
