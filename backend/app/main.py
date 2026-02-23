from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.llm import generate_sql
from app.utils import run_query
from app.db import init_db
from fastapi import UploadFile, File
from app.file_handler import save_csv_to_db
uploaded_schema = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

@app.on_event("startup")
def startup():
    init_db()

@app.post("/query")
def query_db(q: Question):
    global uploaded_schema

    if not uploaded_schema:
        return {"error": "Please upload a CSV file first."}

    sql = generate_sql(q.question, uploaded_schema)

    print("Generated SQL:", sql)

    result = run_query(sql)

    return {
        "generated_sql": sql,
        "result": result
    }

@app.get("/")
def home():
    return {"message": "NL → SQL backend running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)

@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    global uploaded_schema
    uploaded_schema = save_csv_to_db(file)

    return {
        "message": "File uploaded successfully",
        "schema": uploaded_schema
    }