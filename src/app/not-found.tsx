export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#fafaf9", color: "#1c1917" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: 700, marginBottom: "0.5rem" }}>404</h1>
          <p style={{ fontSize: "1.1rem", color: "#57534e", marginBottom: "1.5rem" }}>Page not found / Pagina non trovata</p>
          <a href="/" style={{ color: "#b45309", textDecoration: "none", fontSize: "0.95rem" }}>← Back to home / Torna alla home</a>
        </div>
      </body>
    </html>
  );
}
