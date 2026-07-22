import type { Metadata } from "next";
import { Scene02 } from "../Scene02";

export const metadata: Metadata = {
  title: "Hormone Intelligence — Scene 02 Preview",
  description: "Internal preview of Hormone Intelligence Scene 02, built from the approved production documents.",
};

export default function HiPreviewScene02Page() {
  return (
    <main style={{ padding: "48px 20px 100px", maxWidth: 640, margin: "0 auto" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A08F7E", marginBottom: 8 }}>
        Hormone Intelligence — Scene Assembly
      </p>
      <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, color: "#2C2A28", marginBottom: 6 }}>
        Scene 02 — Adrenal Mechanism
      </h1>
      <p style={{ fontSize: 13.5, color: "#5A534D", lineHeight: 1.7, marginBottom: 36 }}>
        0:39–1:29 · Built from Master Script v1.0 §2 and CG Storyboard v1.0, Scene 02. Inherits Scene 01&apos;s frame, pacing, and subtitle conventions per SCENE_REFERENCE.md.
      </p>
      <Scene02 />
    </main>
  );
}
