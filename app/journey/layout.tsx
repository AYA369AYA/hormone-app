export default function JourneyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={styles.wrapper}>
      <p style={styles.brand}>Hormone Journey</p>
      {children}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#F7F3EE,#EFE7DC)",
  },
  brand: {
    textAlign: "center",
    paddingTop: 24,
    fontSize: 13,
    letterSpacing: "0.18em",
    color: "#A08F7E",
    textTransform: "uppercase",
  },
};
