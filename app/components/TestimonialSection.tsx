import type { CSSProperties } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialSection() {
  return (
    <div style={styles.section}>
      <p style={styles.kicker}>VOICES</p>
      <h2 style={styles.heading}>身体を知った、その先にある変化</h2>

      <div style={styles.track}>
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
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
  track: {
    display: "flex",
    gap: 14,
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    paddingBottom: 8,
    marginLeft: -18,
    marginRight: -18,
    paddingLeft: 18,
    paddingRight: 18,
  },
};
