<div align="center">

# 🤖 AI Data Analyst

### Upload any CSV → Ask questions in plain English → Get SQL & results instantly

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-6366f1?style=for-the-badge)](https://nl-sql-teal.vercel.app/)
[![GitHub Stars](https://img.shields.io/github/stars/omsudhamsh/nl-sql?style=for-the-badge&color=f59e0b)](https://github.com/omsudhamsh/nl-sql/stargazers)
[![Fork](https://img.shields.io/github/forks/omsudhamsh/nl-sql?style=for-the-badge&color=818cf8)](https://github.com/omsudhamsh/nl-sql/fork)
[![License](https://img.shields.io/github/license/omsudhamsh/nl-sql?style=for-the-badge&color=22c55e)](LICENSE)

<br/>

![AI Data Analyst](assets/screenshot-hero.png)

</div>

---

## ✨ Features

- 📂 **CSV Upload** — Upload any `.csv` file as your dataset
- 🧠 **AI-Powered** — Converts natural language to SQL using Groq's LLaMA 3.1
- 📊 **Instant Results** — See query results in a clean, interactive table
- 🔍 **Dynamic Schema** — Auto-detects table structure from uploaded CSV
- 📋 **Copy SQL** — One-click copy for generated queries
- ⌨️ **Keyboard Shortcut** — `Ctrl + Enter` to submit
- 🌙 **Premium Dark UI** — Modern design with smooth animations
- 🔒 **Safe Queries** — Only `SELECT` statements allowed

---

## 📸 Screenshots

<div align="center">

| Upload Dataset | Query Results |
|:-:|:-:|
| ![Upload](assets/screenshot-hero.png) | ![Results](assets/screenshot-results.png) |

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Vercel)                     │
│                                                         │
│   React + Vite + Tailwind CSS                           │
│   ┌───────────────────────────────────────────┐         │
│   │  Step 1: Upload CSV file                  │         │
│   │  Step 2: Ask question in plain English    │         │
│   └──────────┬────────────────┬───────────────┘         │
│              │ POST /upload   │ POST /query             │
└──────────────┼────────────────┼─────────────────────────┘
               │                │
               ▼                ▼
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (Render)                       │
│                                                         │
│   FastAPI + Python                                      │
│   ┌─────────────────┐    ┌──────────────────────┐       │
│   │  /upload API    │    │  /query API          │       │
│   │  CSV → SQLite   │    │  Question → Groq LLM │       │
│   │  via Pandas     │    │  → SQL → Execute     │       │
│   └────────┬────────┘    └──────────┬───────────┘       │
│            │                        │                   │
│            ▼                        ▼                   │
│   ┌─────────────────────────────────────────┐           │
│   │   SQLite Database (uploaded_data.db)    │           │
│   │   Dynamic table from uploaded CSV       │           │
│   └─────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────┘
```

### How It Works

1. **Upload** a CSV file — backend saves it to a SQLite database using Pandas
2. **Schema auto-detection** — column names and types are extracted automatically
3. **Ask a question** in natural language (e.g., *"Show employees with salary > 50000"*)
4. **Groq AI (LLaMA 3.1-8B)** generates a `SELECT` SQL query using the detected schema
5. **Backend executes the SQL** on the SQLite database
6. **Results** are returned as JSON and displayed in a styled table

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4 | UI & styling |
| **Backend** | FastAPI, Python | REST API |
| **AI/LLM** | Groq Cloud, LLaMA 3.1-8B | NL → SQL conversion |
| **Database** | SQLite, SQLAlchemy, Pandas | Dynamic data storage |
| **Deployment** | Vercel (frontend), Render (backend) | Hosting |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.9
- **Groq API Key** — Get one free at [console.groq.com](https://console.groq.com)

### 1. Clone the Repository

```bash
git clone https://github.com/omsudhamsh/nl-sql.git
cd nl-sql
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo GROQ_API_KEY=your_groq_api_key_here > .env

# Run the backend
uvicorn app.main:app --reload
```

The API server will start at `http://127.0.0.1:8000`

### 3. Setup Frontend

```bash
cd frontend/nl-sql

# Install dependencies
npm install

# Run dev server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
nl-sql/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app, CORS, routes (/upload, /query)
│   │   ├── llm.py           # Groq LLM integration (dynamic schema)
│   │   ├── db.py            # SQLite database setup
│   │   ├── file_handler.py  # CSV → SQLite via Pandas
│   │   └── utils.py         # SQL execution + safety checks
│   ├── requirements.txt
│   └── .env                 # API keys (not committed)
│
├── frontend/nl-sql/
│   ├── src/
│   │   ├── App.jsx          # Main app (upload + query UI)
│   │   ├── index.css         # Premium dark theme styles
│   │   └── main.jsx         # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── assets/                  # Screenshots for README
└── README.md
```

---

## 🔒 Safety

- Only `SELECT` queries are allowed — the backend rejects `INSERT`, `UPDATE`, `DELETE`, etc.
- SQL output is sanitized to strip markdown formatting from LLM responses
- CORS configured for secure cross-origin requests
- API key stored in `.env` (never committed to repo)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Om Sudhamsh Padma](https://github.com/omsudhamsh)**

⭐ Star this repo if you found it useful!

</div>