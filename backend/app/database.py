from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import OperationalError
from sqlalchemy_utils import database_exists, create_database
from app.models.document import Base, Document
from app.core.config import settings


engine = create_engine(settings.DATABASE_URL)

if not database_exists(engine.url):
    create_database(engine.url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def insert_document_metadata(filename: str, filepath: str, content: str) -> int:
    db = SessionLocal()
    try:
        doc = Document(filename=filename, filepath=filepath, content=content)
        db.add(doc)
        db.commit()
        db.refresh(doc)
        return doc.id
    finally:
        db.close()

def get_document_text_by_id(document_id: int) -> str | None:
    db = SessionLocal()
    try:
        doc = db.query(Document).filter(Document.id == document_id).first()
        if doc:
            return doc.content
        return None
    finally:
        db.close()
