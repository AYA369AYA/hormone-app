import type { CSSProperties } from "react";

const sansJp =
  '"Hiragino Kaku Gothic Pro", "Hiragino Sans", "Yu Gothic", sans-serif';

/** /general専用の、ラグジュアリー仕様の最終CTA。文言・ロジックは元と同一。 */
export function GeneralSalivaTestChoiceCta({ testUrl }: { testUrl?: string }) {
  return (
    <div style={styles.wrapper}>
      <p style={styles.kicker}>② SALIVA HORMONE TEST</p>
      <p style={styles.mainHeading}>自分自身の結果を、知る</p>
      <p style={styles.subtitle}>唾液ホルモン検査で、今のホルモンバランスを確認する</p>
      <p style={styles.body}>
        ここまで知った身体の仕組みを、
        <br />
        今度はご自身の数値で確認してみませんか。
        <br />
        唾液ホルモン検査なら、今の身体の状態を、
        <br />
        はっきりと知ることができます。
      </p>
      <a href={testUrl || "/journey/video"} style={styles.button}>
        <span style={styles.buttonLine1}>自分の結果を、知る</span>
        <span style={styles.buttonLine2}>（唾液ホルモン検査のお申し込み）</span>
      </a>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 0,
    padding: "40px 30px",
    borderRadius: 22,
    background: "linear-gradient(165deg, #FBF7F0 0%, #F6F0E4 100%)",
    border: "1px solid rgba(198,169,107,0.18)",
    boxShadow: "0 1px 2px rgba(44,42,40,0.03), 0 24px 50px -32px rgba(44,42,40,0.18)",
    textAlign: "center",
  },
  kicker: {
    fontFamily: sansJp,
    fontSize: 12,
    letterSpacing: "0.18em",
    color: "#A08F7E",
    marginBottom: 14,
  },
  mainHeading: {
    fontFamily: "serif",
    fontSize: 24,
    lineHeight: 1.5,
    color: "#2C2A28",
    fontWeight: 400,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: sansJp,
    fontWeight: 300,
    fontSize: 15,
    lineHeight: 1.7,
    color: "#5A534D",
    marginBottom: 20,
  },
  body: {
    fontFamily: sansJp,
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 1.9,
    color: "#5A534D",
    marginBottom: 28,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    padding: "16px 12px",
    borderRadius: 999,
    border: "1px solid #C6A96B",
    background: "linear-gradient(165deg, #D3B87E 0%, #C6A96B 100%)",
    color: "#fff",
    textDecoration: "none",
    boxSizing: "border-box",
    boxShadow: "0 10px 24px -14px rgba(198,169,107,0.7)",
  },
  buttonLine1: {
    fontFamily: sansJp,
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.04em",
    lineHeight: 1.4,
  },
  buttonLine2: {
    fontFamily: sansJp,
    fontWeight: 300,
    fontSize: 12,
    lineHeight: 1.5,
    whiteSpace: "nowrap",
    marginTop: 4,
  },
};
