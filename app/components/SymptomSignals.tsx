import type { CSSProperties } from "react";
import { ScrollReveal } from "./ScrollReveal";

type TimelineEntry = {
  icon: string;
  time: string;
  symptoms: string[];
};

const TIMELINE: TimelineEntry[] = [
  { icon: "🌅", time: "6:00", symptoms: ["朝すっきり起きられない"] },
  { icon: "🍽", time: "7:00", symptoms: ["朝食欲がない"] },
  { icon: "😴", time: "13:00", symptoms: ["ランチ後に眠くなる"] },
  {
    icon: "🌇",
    time: "17:00",
    symptoms: ["眠い・だる重い", "甘いものやアルコールが欲しくなる"],
  },
  { icon: "🌙", time: "21:00", symptoms: ["気づいたら寝落ちしている"] },
  { icon: "🌌", time: "深夜", symptoms: ["途中で目が覚める", "眠りが浅い"] },
];

export function SymptomSignals() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>あなたの身体は、今どんなサインを送っていますか？</h2>

      <div style={styles.timeline}>
        {TIMELINE.map((entry) => (
          <ScrollReveal key={entry.time}>
            <div style={styles.row}>
              <div style={styles.timeCol}>
                <span style={styles.icon}>{entry.icon}</span>
                <span style={styles.time}>{entry.time}</span>
              </div>
              <div style={styles.card}>
                {entry.symptoms.map((symptom) => (
                  <div key={symptom}>{symptom}</div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <p style={styles.closing}>
        これらは、身体が本来の働きを十分に発揮できていないサインです。
      </p>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 48,
  },
  heading: {
    fontSize: 20,
    lineHeight: 1.6,
    color: "#2C2A28",
    marginBottom: 20,
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    position: "relative",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "64px 1fr",
    gap: 12,
    alignItems: "stretch",
  },
  timeCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  icon: {
    fontSize: 20,
    lineHeight: 1,
  },
  time: {
    fontSize: 12,
    color: "#8A8078",
    fontVariantNumeric: "tabular-nums",
  },
  card: {
    padding: "14px 18px",
    borderRadius: 14,
    background: "#FCFAF7",
    border: "1px solid rgba(198,169,107,0.2)",
    lineHeight: 1.7,
    color: "#5A534D",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  closing: {
    marginTop: 24,
    fontSize: 18,
    lineHeight: 1.8,
    color: "#2C2A28",
    fontWeight: 600,
    textAlign: "center",
  },
};
