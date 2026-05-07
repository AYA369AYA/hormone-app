export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f5f2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily: "serif",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "38px",
          marginBottom: "20px",
          letterSpacing: "1px",
        }}
      >
        Hormone Intelligence Experience
      </h1>

      <p
        style={{
          maxWidth: "600px",
          lineHeight: "1.8",
          color: "#555",
          marginBottom: "40px",
        }}
      >
        A refined wellness experience designed to reconnect women
        with their hormonal rhythm, vitality, beauty, and inner recovery.
      </p>

      <a
        href="/hotel"
        style={{
          padding: "14px 32px",
          borderRadius: "999px",
          backgroundColor: "#000",
          color: "#fff",
          textDecoration: "none",
          fontSize: "14px",
          letterSpacing: "1px",
        }}
      >
        Enter Experience
      </a>
    </main>
  );
}
