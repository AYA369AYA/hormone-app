"use client";

import { useState, type CSSProperties } from "react";
import { SALIVA_TEST_TESTIMONIALS, type SalivaTestTestimonial } from "@/lib/salivaTestTestimonials";

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
      <p style={styles.concern}>主なお悩み：{testimonial.concern}</p>
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
    marginTop: 32,
  },
  kicker: {
    fontSize: 12,
    letterSpacing: "0.14em",
    color: "#A08F7E",
    marginBottom: 8,
    textAlign: "center",
  },
  heading: {
    fontSize: 18,
    lineHeight: 1.6,
    color: "#2C2A28",
    marginBottom: 18,
    textAlign: "center",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  card: {
    padding: 20,
    borderRadius: 18,
    background: "#FFFFFF",
    border: "1px solid rgba(198,169,107,0.22)",
  },
  concern: {
    fontSize: 12,
    color: "#C6A96B",
    marginBottom: 10,
  },
  excerpt: {
    fontSize: 14,
    lineHeight: 1.9,
    color: "#2C2A28",
    fontStyle: "italic",
  },
  expanded: {
    marginTop: 12,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 1.9,
    color: "#5A534D",
    marginBottom: 10,
  },
  toggle: {
    display: "inline-block",
    marginTop: 4,
    background: "none",
    border: "none",
    padding: 0,
    fontSize: 13,
    color: "#8A7857",
    textDecoration: "underline",
    cursor: "pointer",
  },
  disclaimer: {
    marginTop: 14,
    fontSize: 11,
    lineHeight: 1.7,
    color: "#A08F7E",
    textAlign: "center",
  },
};
