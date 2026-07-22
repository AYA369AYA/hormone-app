"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hiColor } from "../components/hi/tokens";
import { usePrefersReducedMotion } from "../components/hi/OrganNode";
import { MechanismDiagram } from "../components/hi/MechanismDiagram";
import { HormoneGraph } from "../components/hi/HormoneGraph";
import { LabReportCard } from "../components/hi/LabReportCard";
import { CauseEffectConnector } from "../components/hi/CauseEffectConnector";

/**
 * Scene 02 — Adrenal mechanism. [0:39–1:29 in CG Storyboard v1.0, 50s]
 * Rebuilt under Visual Language v2 (scientific visual storytelling).
 *
 * Scientific question this scene answers: "How does cortisol normally
 * work, and what happens when that rhythm changes?" Structured as three
 * acts, each teaching one part of that answer, cross-fading on the same
 * stage rather than scattering elements across the frame:
 *
 *   Act 1 (mechanism)   — MechanismDiagram: brain → hypothalamus →
 *                          pituitary → adrenal, labeled, sequenced.
 *   Act 2 (normal output) — HormoneGraph: the circadian curve this
 *                          mechanism produces when working normally.
 *   Act 3 (what changes) — LabReportCard + CauseEffectConnector: a real
 *                          report shape showing the flagged low AM
 *                          value, connected explicitly to a symptom.
 *
 * All data (report rows, graph points) is a plain array passed as props —
 * built so real anonymized clinical reports can replace the sample values
 * later without touching this file's layout.
 *
 * Inherits Scene 01's frame, timing philosophy, subtitle behavior, and
 * accessibility pattern (SCENE_REFERENCE.md). Master Script v1.0 §2 text
 * unchanged and verbatim — only the visuals were rebuilt.
 */

const SCENE_DURATION_S = 50;

interface SubtitleCue {
  text: string;
  start: number;
  end: number;
}

const SUBTITLES: SubtitleCue[] = [
  { start: 4.0, end: 7.9, text: "そういったサインが出ている時の@@多くのケースで" },
  { start: 7.9, end: 11.8, text: "今見ていただいているように@@唾液副腎ストレス検査では" },
  { start: 11.8, end: 15.7, text: "副腎というホルモンで作られる@@コルチゾールというホルモンが" },
  { start: 15.7, end: 19.6, text: "本来ですと何かストレスに@@対応するために" },
  { start: 19.6, end: 23.5, text: "たくさん作ることで代償的に" },
  { start: 23.5, end: 27.4, text: "あるいは体内のストレスに@@対応するために" },
  { start: 27.4, end: 31.3, text: "たくさん作られて@@コルチゾール高値が出るんですけれども" },
  { start: 31.3, end: 35.2, text: "多くの方でその段階を過ぎて" },
  { start: 35.2, end: 39.1, text: "ストレス期間が@@長く続きすぎて" },
  { start: 39.1, end: 43.0, text: "コルチゾールというホルモンそのものが@@副腎で作れなくなってしまっている状態" },
  { start: 43.0, end: 46.75, text: "つまりコルチゾールが低値ローという@@状態が出ている方っていうのが@@とっても多いです" },
];

const FULL_TRANSCRIPT =
  "そういったサインが出ている時の多くのケースで、今見ていただいているように唾液副腎ストレス検査では、副腎というホルモンで作られるコルチゾールというホルモンが、本来ですと何かストレスに対応するためにたくさん作ることで代償的に、あるいは体内のストレスに対して対応するためにたくさん作られて、コルチゾール高値が出るんですけれども、多くの方でその段階を過ぎて、ストレス期間が長く続きすぎて、コルチゾールというホルモンそのものが副腎で作れなくなってしまっている状態、つまりコルチゾールが低値ローという状態が出ている方っていうのがとっても多いです。";

// Act timing, in seconds from scene start. Overlapping windows crossfade.
const ACT1_START = 3.5;
const ACT1_FADE_OUT_START = 15.5;
const ACT1_END = 16.5;
const ACT2_START = 15.5;
const ACT2_FADE_OUT_START = 33.0;
const ACT2_END = 34.0;
const ACT3_START = 33.0;
const EXIT_START = 46.75;

const GRAPH_IDEAL = [
  { label: "起床時", value: 0.9 },
  { label: "午前", value: 0.7 },
  { label: "午後", value: 0.55 },
  { label: "夕方", value: 0.4 },
  { label: "夜", value: 0.25 },
];
const GRAPH_ACTUAL = [
  { label: "起床時", value: 0.25 },
  { label: "午前", value: 0.3 },
  { label: "午後", value: 0.4 },
  { label: "夕方", value: 0.25 },
  { label: "夜", value: 0.18 },
];

const REPORT_ROWS = [
  { name: "コルチゾール（起床時）", value: "3.2 nmol/L", range: "基準値 8.0–20.0", flagged: true },
  { name: "コルチゾール（正午）", value: "6.1 nmol/L", range: "基準値 3.0–8.0", flagged: false },
  { name: "コルチゾール（夕方）", value: "2.4 nmol/L", range: "基準値 1.0–3.0", flagged: false },
  { name: "コルチゾール（就寝前）", value: "0.9 nmol/L", range: "基準値 0.5–1.5", flagged: false },
];

function fadeWindow(elapsed: number, start: number, fadeOutStart: number, end: number): number {
  if (elapsed < start || elapsed >= end) return 0;
  const fadeIn = Math.min(1, (elapsed - start) / 0.9);
  const fadeOut = Math.min(1, (end - elapsed) / Math.max(0.9, end - fadeOutStart));
  return Math.min(fadeIn, fadeOut);
}

type PlayState = "idle" | "playing" | "done";

export function Scene02() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (playState !== "playing") return;
    startRef.current = performance.now();
    const tick = (now: number) => {
      const t = (now - (startRef.current ?? now)) / 1000;
      if (t >= SCENE_DURATION_S) {
        setElapsed(SCENE_DURATION_S);
        setPlayState("done");
        return;
      }
      setElapsed(t);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
  }, [playState]);

  const play = () => {
    setElapsed(0);
    setPlayState("playing");
  };

  // Reduced motion / static: every act shown at once, stacked and fully
  // legible, no animation — the diagram, graph, and report should tell
  // the same story without motion, per Visual Language v2 principle 2.
  if (prefersReducedMotion) {
    return (
      <div style={styles.frame}>
        <div style={{ ...styles.sceneInner, position: "relative", overflow: "auto", padding: "20px 16px" }}>
          <MechanismDiagram
            steps={[{ organ: "brain" }, { organ: "hypothalamus" }, { organ: "pituitary" }, { organ: "adrenal" }]}
            active={false}
            disableAnimation
          />
          <div style={{ marginTop: 20 }}>
            <HormoneGraph
              idealPoints={GRAPH_IDEAL}
              actualPoints={GRAPH_ACTUAL}
              optimalRange={{ top: 0.85, bottom: 0.45 }}
              idealLegendLabel="理想的なリズム"
              actualLegendLabel="この方の実際のパターン"
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <LabReportCard title="唾液ホルモン検査結果" rows={REPORT_ROWS} isSampleData />
          </div>
          <div style={{ marginTop: 14 }}>
            <CauseEffectConnector>
              <strong style={{ color: hiColor.ink }}>起床時コルチゾールが基準値を下回っています。</strong>
              これが「朝すっきり起きれない」「集中力が続かない」という感覚と直接つながっています。
            </CauseEffectConnector>
          </div>
        </div>
        <p style={styles.srOnly}>{FULL_TRANSCRIPT}</p>
      </div>
    );
  }

  const activeSubtitle = SUBTITLES.find((s) => elapsed >= s.start && elapsed < s.end);
  const inExit = elapsed >= EXIT_START;
  const exitProgress = inExit ? Math.min(1, (elapsed - EXIT_START) / (SCENE_DURATION_S - EXIT_START)) : 0;

  const act1Opacity = fadeWindow(elapsed, ACT1_START, ACT1_FADE_OUT_START, ACT1_END);
  const act2Opacity = fadeWindow(elapsed, ACT2_START, ACT2_FADE_OUT_START, ACT2_END);
  const act3Opacity = elapsed >= ACT3_START ? Math.min(1, (elapsed - ACT3_START) / 0.9) : 0;

  return (
    <div>
      <div style={styles.frame}>
        <div
          style={{
            ...styles.sceneInner,
            opacity: playState === "idle" ? 0 : inExit ? 1 - exitProgress : 1,
            transition: playState === "idle" ? "opacity 1000ms ease-in" : "opacity 200ms linear",
          }}
        >
          <div style={{ ...styles.actLayer, opacity: act1Opacity }}>
            <MechanismDiagram
              steps={[{ organ: "brain" }, { organ: "hypothalamus" }, { organ: "pituitary" }, { organ: "adrenal" }]}
              active={playState === "playing" && act1Opacity > 0.1}
            />
          </div>

          <div style={{ ...styles.actLayer, opacity: act2Opacity, padding: "0 24px" }}>
            <HormoneGraph
              idealPoints={GRAPH_IDEAL}
              actualPoints={GRAPH_ACTUAL}
              optimalRange={{ top: 0.85, bottom: 0.45 }}
              idealLegendLabel="理想的なリズム"
              actualLegendLabel="この方の実際のパターン"
            />
          </div>

          <div style={{ ...styles.actLayer, opacity: act3Opacity, padding: "0 20px", justifyContent: "flex-start", paddingTop: "18%" }}>
            <LabReportCard title="唾液ホルモン検査結果" rows={REPORT_ROWS} isSampleData />
            <div style={{ marginTop: 14, width: "100%" }}>
              <CauseEffectConnector>
                <strong style={{ color: hiColor.ink }}>起床時コルチゾールが基準値を下回っています。</strong>
                これが「朝すっきり起きれない」感覚と直接つながっています。
              </CauseEffectConnector>
            </div>
          </div>

          {activeSubtitle && !inExit && (
            <div style={styles.subtitleBox} key={activeSubtitle.start}>
              <p style={styles.subtitleText}>
                {activeSubtitle.text.split("@@").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>

        <p style={styles.srOnly}>{FULL_TRANSCRIPT}</p>
      </div>

      <div style={styles.controls}>
        <button onClick={play} style={styles.playButton} disabled={playState === "playing"}>
          {playState === "playing" ? `Playing… ${elapsed.toFixed(1)}s / ${SCENE_DURATION_S}s` : playState === "done" ? "Replay Scene 02" : "Play Scene 02"}
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  frame: {
    position: "relative",
    width: "100%",
    maxWidth: 380,
    margin: "0 auto",
    aspectRatio: "9 / 16",
    background: hiColor.canvas,
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 1px 2px rgba(44,42,40,0.06), 0 12px 32px rgba(44,42,40,0.10)",
  },
  sceneInner: {
    position: "absolute",
    inset: 0,
    padding: "12% 14%",
  },
  actLayer: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 14%",
    transition: "opacity 700ms ease-in-out",
    pointerEvents: "none",
  },
  subtitleBox: {
    position: "absolute",
    left: "8%",
    right: "8%",
    bottom: "9%",
    background: "rgba(44,42,40,0.55)",
    borderRadius: 10,
    padding: "10px 14px",
    animation: "hi-subtitle-fade-kf 400ms ease-out",
  },
  subtitleText: {
    margin: 0,
    color: hiColor.canvas,
    fontSize: 14,
    lineHeight: 1.6,
    textAlign: "center",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  playButton: {
    fontSize: 13,
    padding: "10px 20px",
    borderRadius: 999,
    border: "1px solid rgba(44,42,40,0.15)",
    background: hiColor.canvas,
    color: hiColor.ink,
    cursor: "pointer",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
};
