from sqlalchemy import text
from app.db import engine


def clean_sql(sql):
    # Remove markdown formatting if present
    sql = sql.replace("```sql", "").replace("```", "").strip()
    return sql


def run_query(sql):
    sql = clean_sql(sql)

    # Safety check
    if not sql.lower().startswith("select"):
        return {"error": "Only SELECT queries allowed"}

    with engine.connect() as conn:
        result = conn.execute(text(sql))
        rows = [dict(row._mapping) for row in result]

    return rows