from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.llm import generate_sql
from app.utils import run_query
from app.db import init_db

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
    sql = generate_sql(q.question)
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