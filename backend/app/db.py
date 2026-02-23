from sqlalchemy import create_engine, text

# SQLite DB file
DATABASE_URL = "sqlite:///./data.db"

engine = create_engine(DATABASE_URL, echo=True)


def init_db():
    with engine.connect() as conn:
        conn.execute(text("""
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY,
            name TEXT,
            amount INTEGER,
            date TEXT
        )
        """))

        # Clear previous data
        conn.execute(text("DELETE FROM customers"))

        conn.execute(text("""
        INSERT INTO customers (name, amount, date)
        VALUES
        ('Rahul', 12000, '2025-01-10'),
        ('Sneha', 8000, '2025-01-15'),
        ('Amit', 15000, '2025-01-20')
        """))

        conn.commit()