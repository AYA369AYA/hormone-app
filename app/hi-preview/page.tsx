import type { Metadata } from "next";
import { Scene01 } from "./Scene01";

export const metadata: Metadata = {
  title: "Hormone Intelligence — Scene Preview",
  description: "Internal preview of Hormone Intelligence CG scenes, built from the approved production documents.",
};

export default function HiPreviewPage() {
  return (
    <main style={{ padding: "48px 20px 100px", maxWidth: 640, margin: "0 auto" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A08F7E", marginBottom: 8 }}>
        Hormone Intelligence — Scene Assembly
      </p>
      <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, color: "#2C2A28", marginBottom: 6 }}>
        Scene 01 — Self-recognition
      </h1>
      <p style={{ fontSize: 13.5, color: "#5A534D", lineHeight: 1.7, marginBottom: 36 }}>
        0:00–0:39 · Built from Master Script v1.0 §1 and CG Storyboard v1.0, Scene 01. One scene at a time, per review.
      </p>
      <Scene01 />
    </main>
  );
}
