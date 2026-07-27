import type { CSSProperties } from "react";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div style={styles.card}>
      <div style={styles.photoWrap}>
        {testimonial.photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={testimonial.photoSrc} alt={testimonial.name} style={styles.photo} />
        ) : (
          <div style={styles.photoPlaceholder} aria-hidden="true" />
        )}
      </div>

      <p style={styles.name}>
        {testimonial.name}
        <span style={styles.meta}>
          {" "}
          / {testimonial.ageRange}
          {testimonial.occupation ? ` ・ ${testimonial.occupation}` : ""}
        </span>
      </p>

      <div style={styles.row}>
        <span style={styles.rowLabel}>Before</span>
        <p style={styles.rowText}>{testimonial.before}</p>
      </div>
      <div style={styles.row}>
        <span style={styles.rowLabel}>Current</span>
        <p style={styles.rowText}>{testimonial.current}</p>
      </div>

      <p style={styles.message}>「{testimonial.message}」</p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  card: {
    flex: "0 0 82%",
    scrollSnapAlign: "start",
    padding: 24,
    borderRadius: 20,
    background: "#FFFFFF",
    border: "1px solid rgba(198,169,107,0.22)",
  },
  photoWrap: {
    marginBottom: 16,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    objectFit: "cover",
  },
  photoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 50% 30%, oklch(88% .05 85) 0%, transparent 65%), oklch(95.5% .014 85)",
    border: "1px solid rgba(198,169,107,0.25)",
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
    color: "#2C2A28",
    marginBottom: 16,
  },
  meta: {
    fontSize: 12,
    fontWeight: 400,
    color: "#A08F7E",
  },
  row: {
    marginBottom: 10,
  },
  rowLabel: {
    display: "inline-block",
    fontSize: 10,
    letterSpacing: "0.1em",
    color: "#A08F7E",
    marginBottom: 4,
  },
  rowText: {
    fontSize: 13,
    lineHeight: 1.7,
    color: "#5A534D",
  },
  message: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid rgba(198,169,107,0.2)",
    fontSize: 13,
    lineHeight: 1.8,
    color: "#2C2A28",
    fontStyle: "italic",
  },
};
