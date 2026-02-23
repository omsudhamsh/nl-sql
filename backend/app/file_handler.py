import pandas as pd
from sqlalchemy import create_engine

DATABASE_URL = "sqlite:///./uploaded_data.db"
engine = create_engine(DATABASE_URL)


def save_csv_to_db(file):
    # Read CSV file
    df = pd.read_csv(file.file)

    # Save as SQLite table
    table_name = "uploaded_table"
    df.to_sql(table_name, engine, if_exists="replace", index=False)

    # Extract schema
    schema = {
        "table": table_name,
        "columns": list(df.columns)
    }

    return schema