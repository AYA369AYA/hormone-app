"use client";

import { useState, type CSSProperties } from "react";
import { SALIVA_TEST_TESTIMONIALS, type SalivaTestTestimonial } from "@/lib/salivaTestTestimonials";

const sansJp =
  '"Hiragino Kaku Gothic Pro", "Hiragino Sans", "Yu Gothic", sans-serif';

export function SalivaTestTestimonialSection() {
  return (
    <div style={styles.wrapper}>
      <p style={styles.kicker}>VOICES</p>
      <h2 style={styles.heading}>唾液ホルモン検査を受けられた方の声</h2>

      <div style={styles.stack}>
        {SALIVA_TEST_TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>

      <p style={styles.disclaimer}>※個人のご感想です。効果には個人差があります。</p>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: SalivaTestTestimonial }) {
  const [expanded, setExpanded] = useState(false);
  const rest = testimonial.body.slice(1);

  return (
    <div style={styles.card}>
      <p style={styles.concern}>{testimonial.concern}</p>
      <p style={styles.excerpt}>「{testimonial.excerpt}」</p>

      {expanded && (
        <div style={styles.expanded}>
          {rest.map((paragraph, i) => (
            <p key={i} style={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        style={styles.toggle}
      >
        {expanded ? "閉じる" : "続きを読む"}
      </button>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 0,
  },
  kicker: {
    fontFamily: sansJp,
    fontSize: 12,
    letterSpacing: "0.2em",
    color: "#A08F7E",
    marginBottom: 20,
    textAlign: "center",
  },
  heading: {
    fontFamily: "serif",
    fontSize: 22,
    fontWeight: 400,
    lineHeight: 1.6,
    color: "#2f2923",
    marginBottom: 40,
    textAlign: "center",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    padding: 26,
    borderRadius: 18,
    background: "linear-gradient(165deg, #FFFFFF 0%, #FCFAF7 100%)",
    border: "1px solid rgba(198,169,107,0.2)",
    boxShadow: "0 1px 2px rgba(44,42,40,0.03), 0 18px 36px -26px rgba(44,42,40,0.16)",
  },
  concern: {
    fontFamily: sansJp,
    fontSize: 11,
    letterSpacing: "0.1em",
    color: "#C6A96B",
    marginBottom: 14,
  },
  excerpt: {
    fontFamily: "serif",
    fontSize: 15,
    lineHeight: 2,
    color: "#2C2A28",
    fontStyle: "italic",
  },
  expanded: {
    marginTop: 14,
  },
  paragraph: {
    fontFamily: sansJp,
    fontWeight: 300,
    fontSize: 13,
    lineHeight: 1.9,
    color: "#5A534D",
    marginBottom: 10,
  },
  toggle: {
    display: "inline-block",
    marginTop: 8,
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: sansJp,
    fontSize: 12,
    letterSpacing: "0.04em",
    color: "#8A7857",
    textDecoration: "underline",
    cursor: "pointer",
  },
  disclaimer: {
    marginTop: 20,
    fontFamily: sansJp,
    fontWeight: 300,
    fontSize: 11,
    lineHeight: 1.7,
    color: "#A08F7E",
    textAlign: "center",
  },
};
