from fastapi import FastAPI
from app.api.endpoints import upload, question
from app.database import create_tables
from app.core.config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.PROJECT_NAME)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.on_event("startup")
def on_startup():
    create_tables()

app.include_router(upload.router, prefix="/api/pdf", tags=["PDF Upload"])
app.include_router(question.router, prefix="/api/question", tags=["Question Answering"])
