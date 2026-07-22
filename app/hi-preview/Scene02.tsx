"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hiColor, hiLuminosity, hiOrganLabelJa } from "../components/hi/tokens";
import { OrganNode, usePrefersReducedMotion } from "../components/hi/OrganNode";
import { BodySilhouette, BODY_REGIONS, BODY_VIEWBOX } from "../components/hi/BodySilhouette";
import { curvedPath } from "../components/hi/SignalPath";

/**
 * Scene 02 — Adrenal mechanism. [0:39–1:29 in CG Storyboard v1.0, 50s]
 *
 * Inherits Scene 01's frame, timing philosophy, subtitle behavior, and
 * accessibility pattern exactly (see SCENE_REFERENCE.md) — only the
 * scene-specific content differs. Built from Master Script v1.0 §2
 * (verbatim) and CG Storyboard v1.0's Scene 02 entry.
 *
 * Uses A1 (OrganNode) directly rather than A2 (SignalPath): A2 is built
 * for a continuously *looping* sequence across a fixed topology, which is
 * exactly right for the full-network scenes (07/09/12) but wrong here —
 * Scene 02 is one scripted, one-time narrative arc (signal → build-up →
 * gradual depletion) with precise timing tied to the narration, not a
 * repeating cycle. It reuses A2's exact curve construction (`curvedPath`,
 * exported for this purpose) and the same `hi-signal-travel-kf` keyframe,
 * so it looks identical to A2's connections — the difference is who's
 * driving the timing, not the visual language.
 *
 * Camera note: the Storyboard calls for "camera travels along the signal
 * path." Scene 01 established no literal camera movement (a static
 * frame, motion carried entirely by content) — Scene 02 stays consistent
 * with that precedent rather than introducing viewBox panning as a new
 * technique. "Travel" is expressed the same way A2 already expresses it:
 * the connecting path drawing on, then a dot travelling along it.
 */

const SCENE_DURATION_S = 50;

interface SubtitleCue {
  text: string;
  start: number;
  end: number;
}

// Verbatim Master Script §2.
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

// CG beat schedule, in seconds from scene start.
const BRAIN_APPEAR = 4.0;
const PATH_DRAW_START = 4.6;
const PATH_DRAW_END = 7.6;
const FIRST_PULSE = 8.4;
const LABEL_START = 9.2;
const LABEL_END = 12.0;
const EXTRA_PULSES = [15.5, 21.5, 27.5]; // repeated stimulation, matching "たくさん作ることで" / "たくさん作られて"
const DIM_START = 31.0; // "多くの方でその段階を過ぎて" — exhaustion begins
const DIM_END = 45.5;
const EXIT_START = 46.75; // final ~6.5% of the scene, matching Scene 01's convention

const brainPos = BODY_REGIONS.brain;
const adrenalPos = BODY_REGIONS.adrenal;
const connectionPath = curvedPath(brainPos.x, brainPos.y, adrenalPos.x, adrenalPos.y);

type PlayState = "idle" | "playing" | "done";

export function Scene02() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const [firedPulses, setFiredPulses] = useState<Set<number>>(new Set());

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
    setFiredPulses(new Set());
    setPlayState("playing");
  };

  if (prefersReducedMotion) {
    return (
      <div style={styles.frame}>
        <BodySilhouette opacity={0.14}>
          <svg viewBox={BODY_VIEWBOX} style={styles.overlaySvg}>
            <path d={connectionPath} fill="none" stroke={hiColor.gold} strokeOpacity={0.28} strokeWidth={1.2} />
          </svg>
          <NodeAt pos={brainPos} organ="brain" state="healthy" />
          <NodeAt pos={adrenalPos} organ="adrenal" state="depleted" />
        </BodySilhouette>
        <div style={styles.staticTranscript}>
          <p style={styles.staticTranscriptText}>{FULL_TRANSCRIPT}</p>
        </div>
      </div>
    );
  }

  const activeSubtitle = SUBTITLES.find((s) => elapsed >= s.start && elapsed < s.end);
  const inExit = elapsed >= EXIT_START;
  const exitProgress = inExit ? Math.min(1, (elapsed - EXIT_START) / (SCENE_DURATION_S - EXIT_START)) : 0;

  const brainVisible = elapsed >= BRAIN_APPEAR;
  const pathProgress = Math.min(1, Math.max(0, (elapsed - PATH_DRAW_START) / (PATH_DRAW_END - PATH_DRAW_START)));
  const labelOpacity =
    elapsed >= LABEL_START && elapsed < LABEL_END
      ? Math.min(1, (elapsed - LABEL_START) / 0.5, (LABEL_END - elapsed) / 0.5)
      : 0;

  // Adrenal luminosity envelope: full brightness once the first signal
  // arrives, held through the "high production" phase, then eased down
  // to the token-defined "dim" endpoint as the narration shifts to
  // depletion. This wraps OrganNode from the outside rather than
  // reaching into its state model — OrganNode itself stays untouched,
  // always rendered at state="healthy" so its own breathing/glow logic
  // runs normally; the scene layers a separate opacity envelope on top.
  let adrenalEnvelope = 0;
  if (elapsed >= FIRST_PULSE) {
    if (elapsed < DIM_START) {
      adrenalEnvelope = hiLuminosity.full.opacity;
    } else if (elapsed < DIM_END) {
      const t = (elapsed - DIM_START) / (DIM_END - DIM_START);
      const eased = t * t * (3 - 2 * t); // smoothstep — a gradual draw-down, not a linear one
      adrenalEnvelope = hiLuminosity.full.opacity + (hiLuminosity.dim.opacity - hiLuminosity.full.opacity) * eased;
    } else {
      adrenalEnvelope = hiLuminosity.dim.opacity;
    }
  }

  const activePulseTime = [FIRST_PULSE, ...EXTRA_PULSES].find((t) => elapsed >= t && elapsed < t + 1.4 && !firedPulses.has(t));
  if (activePulseTime !== undefined) {
    // Mark fired on the next tick rather than during render, matching the
    // "adjust state during render" pattern already used in A1 — avoids a
    // setState-in-effect for something that's really just bookkeeping
    // tied to this render's elapsed value.
    setFiredPulses((prev) => {
      if (prev.has(activePulseTime)) return prev;
      const next = new Set(prev);
      next.add(activePulseTime);
      return next;
    });
  }
  const pulseActive = [FIRST_PULSE, ...EXTRA_PULSES].some((t) => elapsed >= t && elapsed < t + 0.9);

  return (
    <div>
      <div style={styles.frame}>
        <div style={{ ...styles.sceneInner, opacity: playState === "idle" ? 0 : 1, transition: "opacity 1000ms ease-in" }}>
          <BodySilhouette opacity={0.14}>
            <svg viewBox={BODY_VIEWBOX} style={styles.overlaySvg} aria-hidden="true">
              {/* Connecting path — draws on rather than appearing instantly, expressing "travel" without a literal camera move. */}
              <path
                d={connectionPath}
                fill="none"
                stroke={hiColor.gold}
                strokeOpacity={0.28}
                strokeWidth={1.2}
                strokeDasharray={1}
                pathLength={1}
                style={{ strokeDashoffset: 1 - pathProgress }}
              />

              {/* Travelling signal — fires at each scripted pulse moment. */}
              {pulseActive && (
                <circle
                  r={3}
                  fill={hiColor.gold}
                  style={{
                    offsetPath: `path("${connectionPath}")`,
                    animation: "hi-signal-travel-kf 900ms linear",
                  }}
                />
              )}

              {inExit && (
                <path
                  d={connectionPath}
                  fill="none"
                  stroke={hiColor.gold}
                  strokeOpacity={0.28 * (1 - exitProgress)}
                  strokeWidth={1.2}
                />
              )}
            </svg>

            {brainVisible && (
              <NodeAt pos={brainPos} organ="brain" state="healthy" style={{ opacity: inExit ? 1 - exitProgress : 1, transition: "opacity 800ms ease-out" }} />
            )}

            <NodeAt
              pos={adrenalPos}
              organ="adrenal"
              state="healthy"
              pulse={pulseActive}
              style={{ opacity: inExit ? adrenalEnvelope * (1 - exitProgress * 0.4) : adrenalEnvelope, transition: "opacity 300ms linear" }}
            />

            {labelOpacity > 0 && (
              <div
                style={{
                  ...styles.organLabel,
                  left: `${(adrenalPos.x / 200) * 100}%`,
                  top: `${((adrenalPos.y + 26) / 280) * 100}%`,
                  opacity: labelOpacity,
                }}
              >
                {hiOrganLabelJa.adrenal}
              </div>
            )}
          </BodySilhouette>

          <div style={{ ...styles.dissolveOverlay, opacity: inExit ? exitProgress * 0.85 : 0 }} />

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

function NodeAt({
  pos,
  organ,
  state,
  pulse,
  style,
}: {
  pos: { x: number; y: number };
  organ: "brain" | "adrenal";
  state: "healthy" | "depleted" | "recovering";
  pulse?: boolean;
  style?: CSSProperties;
}) {
  const size = 44;
  return (
    <div
      style={{
        position: "absolute",
        left: `${(pos.x / 200) * 100}%`,
        top: `${(pos.y / 280) * 100}%`,
        width: size,
        transform: "translate(-50%, -50%)",
        ...style,
      }}
    >
      <OrganNode organ={organ} state={state} pulse={pulse} />
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
  },
  overlaySvg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },
  organLabel: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    fontFamily: "Georgia, serif",
    fontSize: 13,
    color: hiColor.ink,
    transition: "opacity 300ms ease-in-out",
    whiteSpace: "nowrap",
  },
  dissolveOverlay: {
    position: "absolute",
    inset: 0,
    background: hiColor.canvas,
    pointerEvents: "none",
    transition: "opacity 200ms linear",
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
  staticTranscript: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    padding: "14%",
  },
  staticTranscriptText: {
    color: hiColor.inkSoft,
    fontSize: 14,
    lineHeight: 1.9,
    textAlign: "left",
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
