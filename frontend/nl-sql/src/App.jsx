import { useState } from "react";
import axios from "axios";

/* ===== Inline SVG Icons ===== */
const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const IconFork = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
    <path d="M12 12v3" />
  </svg>
);

const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);

const IconDB = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

function App() {
  const [question, setQuestion] = useState("");
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuery = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setSql("");
    setResults([]);

    try {
      const res = await axios.post("http://127.0.0.1:8000/query", { question });

      const cleanedSQL = res.data.generated_sql
        .replace(/```sql/g, "")
        .replace(/```/g, "")
        .trim();

      setSql(cleanedSQL);
      setResults(res.data.result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check backend or API connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleQuery();
    }
  };

  return (
    <div className="app-bg">
      {/* ========== NAVBAR ========== */}
      <nav className="navbar">
        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                borderRadius: "8px",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconDB />
            </div>
            <span style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "-0.3px" }}>
              NL → SQL
            </span>
          </div>

          {/* Right: GitHub actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a href="https://github.com/omsudhamsh/nl-sql" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <IconStar />
              Star
            </a>
            <a href="https://github.com/omsudhamsh/nl-sql/fork" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <IconFork />
              Fork
            </a>
            <a
              href="https://github.com/omsudhamsh"
              target="_blank"
              rel="noopener noreferrer"
              title="Om Sudhamsh Padma"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="https://avatars.githubusercontent.com/u/129719097?v=4"
                alt="Om Sudhamsh Padma"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  transition: "border-color 0.2s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.5)"}
                onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"}
              />
            </a>
          </div>
        </div>
      </nav>

      {/* ========== MAIN ========== */}
      <main style={{ maxWidth: "880px", margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              marginBottom: "10px",
              color: "#f1f5f9",
            }}
          >
            Natural Language to SQL
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "440px", margin: "0 auto" }}>
            Ask your database anything in plain English.
            <br />
            AI converts your question into a SQL query instantly.
          </p>
        </div>

        {/* Query Card */}
        <div className="card" style={{ padding: "24px", marginBottom: "24px" }}>
          <div className="section-label">Ask a question</div>

          <textarea
            className="query-input"
            placeholder="e.g. Show all customers with amount greater than 10000..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "14px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#475569" }}>
              <span className="kbd">Ctrl</span> + <span className="kbd">Enter</span> to submit
            </span>

            <button
              onClick={handleQuery}
              disabled={loading || !question.trim()}
              className="btn-primary"
            >
              {loading && <span className="spinner" />}
              {loading ? "Generating..." : "Generate SQL"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="fade-in"
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: "24px",
              fontSize: "14px",
              color: "#fca5a5",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* SQL Output */}
        {sql && (
          <div className="card fade-in" style={{ padding: "24px", marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div className="section-label" style={{ marginBottom: 0 }}>
                Generated SQL
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(sql)}
                className="btn-ghost"
                style={{ fontSize: "12px", padding: "4px 10px" }}
              >
                📋 Copy
              </button>
            </div>
            <div className="code-block">{sql}</div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="card fade-in" style={{ padding: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div className="section-label" style={{ marginBottom: 0 }}>
                Query Results
              </div>
              <span className="badge">
                {results.length} row{results.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <table className="results-table">
                <thead>
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ========== FOOTER ========== */}
      <footer style={{ textAlign: "center", padding: "0 24px 32px", fontSize: "13px", color: "#334155" }}>
        Built with FastAPI, React & Groq AI
      </footer>
    </div>
  );
}

export default App;