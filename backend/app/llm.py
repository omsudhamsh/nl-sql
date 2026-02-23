import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_sql(question):
    schema = """
    Table: customers
    Columns:
    id INTEGER PRIMARY KEY
    name TEXT
    amount INTEGER
    date TEXT
    """

    prompt = f"""
    Convert natural language to SQL.

    Database schema:
    {schema}

    Rules:
    - Only generate SELECT queries.
    - No explanation.
    - Only SQL query output.

    Question:
    {question}
    """

    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.1-8b-instant"
    )

    return response.choices[0].message.content.strip()