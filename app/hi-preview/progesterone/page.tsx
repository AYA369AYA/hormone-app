import type { Metadata } from "next";
import { SceneProgesterone } from "../SceneProgesterone";

export const metadata: Metadata = {
  title: "Hormone Intelligence — Progesterone Preview",
  description: "Internal preview of the Progesterone flagship scene, first animated pass.",
};

export default function HiPreviewProgesteronePage() {
  return (
    <main style={{ padding: "48px 20px 100px", maxWidth: 640, margin: "0 auto" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A08F7E", marginBottom: 8 }}>
        Hormone Intelligence — Scene Assembly
      </p>
      <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 26, color: "#2C2A28", marginBottom: 6 }}>
        Progesterone — Safety, Resilience, Self-Trust
      </h1>
      <p style={{ fontSize: 13.5, color: "#5A534D", lineHeight: 1.7, marginBottom: 36 }}>
        Flagship scene. Narration trimmed from the project&apos;s master file (Master Script §6,
        6:24–8:59); visuals synchronized to it. Live-action shots are placeholders pending stand-in
        imagery. See Scene 02 for the reference visual language this scene follows.
      </p>
      <SceneProgesterone />
    </main>
  );
}
