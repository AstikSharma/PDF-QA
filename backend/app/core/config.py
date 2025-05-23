import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "PDF QA App"
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    PDF_STORAGE_PATH: str = os.getenv("PDF_STORAGE_PATH")

settings = Settings()
