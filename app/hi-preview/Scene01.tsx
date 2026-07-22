"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hiColor, hiOrganColor } from "../components/hi/tokens";
import { usePrefersReducedMotion } from "../components/hi/OrganNode";
import { BodySilhouette, BODY_VIEWBOX } from "../components/hi/BodySilhouette";

/**
 * Scene 01 — Self-recognition. [0:00–0:39 in CG Storyboard v1.0]
 *
 * Built directly from Master Script v1.0 §1 (verbatim text — nothing here
 * paraphrases the locked narration) and CG Storyboard v1.0's Scene 01
 * entry. Uses only A3 (BodySilhouette) as a real component; the sensation
 * points are intentionally scene-local, not a certified library asset —
 * the Storyboard specifies these are neutral, unnamed, *not* organ-
 * coloured ("No organ colours yet"), so they don't belong in A1's fixed
 * organ palette. If a future scene needs the same device, it should be
 * promoted to its own asset (the Asset List already reserves this as A4)
 * rather than duplicated ad hoc.
 *
 * Timing below is a first-pass choreography, not synced to a locked audio
 * file — there is no final mix for this narration yet. It's built to be
 * easy to retime once one exists: every beat is one entry in SUBTITLES /
 * GLOW_POINTS, in seconds from scene start.
 */

const SCENE_DURATION_S = 39;

interface SubtitleCue {
  text: string; // may contain @@ as a manual line break, matching the existing burn_final_reel.py convention
  start: number;
  end: number;
}

// Verbatim Master Script §1, split into caption-length cards. Every word
// of the locked text appears exactly once, in order.
const SUBTITLES: SubtitleCue[] = [
  { start: 3.5, end: 7.0, text: "ここからは、当院で受けられた@@唾液女性ホルモン検査や" },
  { start: 7.0, end: 10.5, text: "唾液副腎ストレス検査の結果で@@多い傾向をご紹介していこうと思います" },
  { start: 10.5, end: 13.5, text: "朝すっきり起きれない" },
  { start: 13.5, end: 16.5, text: "朝食欲がない" },
  { start: 16.5, end: 19.5, text: "午前中は集中力が@@湧かない" },
  { start: 19.5, end: 22.5, text: "ランチ後に眠くなる" },
  { start: 22.5, end: 27.0, text: "夕方のパワーダウンで@@眠くなったり、体がだるくなったりして" },
  { start: 27.0, end: 31.0, text: "甘いものやアルコールが@@欲しくなったりする" },
  { start: 31.0, end: 35.0, text: "あるいは夜、寝落ちをしたり@@夜に中途覚醒を起こされるなど" },
  { start: 35.0, end: 39.0, text: "ちょっと生活の質が変化される@@というようなサインを@@感じてらっしゃる方が増えてきています" },
];

const FULL_TRANSCRIPT =
  "ここからは、当院で受けられた唾液女性ホルモン検査や唾液副腎ストレス検査の結果で多い傾向をご紹介していこうと思います。朝すっきり起きれない、朝食欲がない、午前中は集中力が湧かない、ランチ後に眠くなる、夕方のパワーダウンで眠くなったり体がだるくなったりして甘いものやアルコールが欲しくなったりする。あるいは夜、寝落ちをしたり、夜に中途覚醒を起こされるなど、ちょっと生活の質が変化される、というようなサインを感じてらっしゃる方が増えてきています。";

interface GlowPoint {
  id: string;
  x: number;
  y: number;
  start: number;
  end: number;
}

// Positioned loosely against the symptom each point corresponds to, in
// BODY_VIEWBOX coordinates (see BodySilhouette). Neutral ink colour, not
// organ colour — see file header.
const GLOW_POINTS: GlowPoint[] = [
  { id: "wake", x: 100, y: 25, start: 10.5, end: 13.7 }, // 朝すっきり起きれない
  { id: "appetite", x: 100, y: 100, start: 13.7, end: 16.7 }, // 朝食欲がない
  { id: "focus", x: 92, y: 21, start: 16.7, end: 19.7 }, // 午前中は集中力が湧かない
  { id: "lunch-sleepy", x: 108, y: 24, start: 19.7, end: 22.7 }, // ランチ後に眠くなる
  { id: "evening", x: 100, y: 88, start: 22.7, end: 27.2 }, // 夕方のパワーダウン
  { id: "cravings", x: 100, y: 46, start: 27.2, end: 31.2 }, // 甘いもの・アルコール
  { id: "sleep", x: 100, y: 15, start: 31.2, end: 35.5 }, // 夜の中途覚醒
];

// The point that survives into the exit transition, warming from neutral
// ink toward the adrenal gold — the storyboard's own transition note:
// "the first glowing point (adrenal) remains, pulling us into Scene 02."
const TRANSITION_POINT = { x: 100, y: 90 };
const TRANSITION_START = 36.5;

type PlayState = "idle" | "playing" | "done";

export function Scene01() {
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

  // Reduced motion: skip the timed choreography entirely and present the
  // scene's content as a static, fully-readable block. Time-based reveal
  // is itself the thing prefers-reduced-motion asks us to avoid — this
  // isn't just disabling a CSS transition, it's a different presentation.
  if (prefersReducedMotion) {
    return (
      <div style={styles.frame}>
        <BodySilhouette opacity={0.14} />
        <div style={styles.staticTranscript}>
          <p style={styles.staticTranscriptText}>{FULL_TRANSCRIPT}</p>
        </div>
      </div>
    );
  }

  const activeSubtitle = SUBTITLES.find((s) => elapsed >= s.start && elapsed < s.end);
  const inExit = elapsed >= TRANSITION_START;
  const exitProgress = inExit ? Math.min(1, (elapsed - TRANSITION_START) / (SCENE_DURATION_S - TRANSITION_START)) : 0;

  return (
    <div>
      <div style={styles.frame} aria-hidden={playState === "idle" ? undefined : true}>
        <div
          style={{
            ...styles.sceneInner,
            opacity: playState === "idle" ? 0 : 1,
            transition: "opacity 1000ms ease-in",
          }}
        >
          <BodySilhouette opacity={0.14} />

          <svg viewBox={BODY_VIEWBOX} style={styles.overlaySvg} aria-hidden="true">
            {GLOW_POINTS.map((p) => {
              const active = elapsed >= p.start && elapsed < p.end + 0.9;
              const fadeIn = Math.min(1, Math.max(0, (elapsed - p.start) / 0.6));
              const fadeOut = Math.min(1, Math.max(0, (p.end + 0.9 - elapsed) / 0.9));
              const opacity = active ? Math.min(fadeIn, fadeOut) : 0;
              return (
                <circle
                  key={p.id}
                  cx={p.x}
                  cy={p.y}
                  r={7}
                  fill={hiColor.ink}
                  opacity={opacity * 0.55}
                  style={{ filter: "blur(3px)" }}
                />
              );
            })}

            {/* Exit transition: one point remains and warms toward the
                adrenal gold, foreshadowing Scene 02 without introducing
                organ colour anywhere earlier in the scene. */}
            {inExit && (
              <circle
                cx={TRANSITION_POINT.x}
                cy={TRANSITION_POINT.y}
                r={7 + exitProgress * 3}
                fill={interpolateColor(hiColor.ink, hiOrganColor.adrenal, exitProgress)}
                opacity={0.35 + exitProgress * 0.5}
                style={{ filter: `blur(${3 - exitProgress * 1.5}px)` }}
              />
            )}
          </svg>

          {/* Whole-frame dissolve during the exit window. */}
          <div
            style={{
              ...styles.dissolveOverlay,
              opacity: inExit ? exitProgress * 0.85 : 0,
            }}
          />

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

        {/* Screen-reader accessible full transcript — the visual captions
            above are timed for sighted viewers; this is the equivalent
            fallback for anyone not perceiving the timed visual sequence,
            following standard time-based-media transcript guidance. */}
        <p style={styles.srOnly}>{FULL_TRANSCRIPT}</p>
      </div>

      <div style={styles.controls}>
        <button onClick={play} style={styles.playButton} disabled={playState === "playing"}>
          {playState === "playing" ? `Playing… ${elapsed.toFixed(1)}s / ${SCENE_DURATION_S}s` : playState === "done" ? "Replay Scene 01" : "Play Scene 01"}
        </button>
      </div>
    </div>
  );
}

function interpolateColor(fromHex: string, toHex: string, t: number): string {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12% 14%",
  },
  overlaySvg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
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
    border: `1px solid rgba(44,42,40,0.15)`,
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
