import os
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

from langchain_community.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.docstore.document import Document

from app.database import get_document_text_by_id

def process_question(document_id: int, question: str) -> str:
    # Get the PDF text from the database
    pdf_text = get_document_text_by_id(document_id)
    if not pdf_text:
        return "Document not found."

    # Create a LangChain-compatible Document
    langchain_doc = Document(page_content=pdf_text)

    # Initialize LLM (OpenAI or others)
    llm = OpenAI(temperature=0)

    # Load a simple QA chain
    chain = load_qa_chain(llm, chain_type="stuff")

    # Run the question-answering chain
    result = chain.run(input_documents=[langchain_doc], question=question)
    return result
