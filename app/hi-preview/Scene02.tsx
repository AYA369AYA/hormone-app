"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hiColor, hiLuminosity, hiOrganColor, hiOrganLabelJa } from "../components/hi/tokens";
import { OrganNode, usePrefersReducedMotion } from "../components/hi/OrganNode";
import { BodySilhouette, BODY_REGIONS, BODY_VIEWBOX } from "../components/hi/BodySilhouette";
import { curvedPath } from "../components/hi/SignalPath";
import { FootageSlot } from "../components/hi/FootageSlot";
import { SCENE02_FOOTAGE } from "../../lib/scene02Footage";
import { footageEnvelope } from "../../lib/footageShot";

/**
 * Creative direction
 *
 * The original Scene 02 remains the creative foundation.
 *
 * This implementation intentionally preserves the original pacing,
 * visual language, emotional tone, and narration.
 *
 * New scientific elements are layered only where they improve
 * understanding without replacing the original storytelling.
 *
 * This is a Director's Cut of the original Scene 02,
 * not a redesign.
 *
 * Concept 1 — "The Body as Witness" (approved): three live-action beats
 * (opening, a mid-scene self-aware gesture, and an ending that expresses
 * quiet agency, not recovery) bookend and briefly punctuate the mechanism.
 * The diagram carries all scientific difficulty (including the depletion
 * dim); her image never mirrors that decline — see lib/scene02Footage.ts.
 * No real footage exists yet — every shot below renders as a labeled
 * placeholder until a `videoSrc` is set in that config file. This is
 * scaffolding for validating pacing/composition/transitions, not final
 * creative.
 */

/**
 * Scene 02 — HPA-axis mechanism. [0:39–1:29 in CG Storyboard v1.0]
 * Director's Cut: restores the original OrganNode/BodySilhouette signal-path
 * visual language (commit aa22dd1) as the foundation after the "Visual
 * Language v2" rebuild (MechanismDiagram/HormoneGraph/LabReportCard) was
 * reverted per direction — evolution of the original cut, not a replacement.
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
 *
 * Audio: public/audio/hi/scene02-narration.m4a — the real §2 narration
 * (this is new versus the original cut, which had no audio at all — only
 * silent, placeholder-timed subtitles). Subtitle cues below are the
 * real-audio-derived timings carried over unchanged from that work.
 *
 * Every CG beat constant below (brain appear, path draw, pulses, dim
 * envelope, exit) is the *original* cut's beat, re-anchored onto the real
 * audio: each constant's fractional position within its original
 * (placeholder-timed) subtitle cue was preserved and re-applied to the
 * same-index cue's real timing window, so the choreography's relationship
 * to the narration is unchanged even though the clock underneath it is
 * now real. This is a first, well-reasoned re-anchoring for your review —
 * not a locked final sync.
 *
 * HPA-axis completeness (director's-cut enhancement): the original cut
 * signalled brain → adrenal directly. The narration says "何かストレスに
 * 対応するために" without naming the intermediate relay, but the real axis
 * — and the CG suggestion in the Master Script — is brain → hypothalamus
 * → pituitary → adrenal. That relay is added here as two more stops on
 * the same signal-path device (own curve, own node, own arriving pulse),
 * not a different visual language: OrganNode already has dedicated
 * hypothalamus/pituitary shapes and tokens (added during the v2 rebuild,
 * kept here). The relay plays once, fast, landing at the adrenal exactly
 * at the original FIRST_PULSE anchor — everything the narration's timing
 * already depended on is unchanged. Repeated stimulation (EXTRA_PULSES)
 * travels only the final pituitary→adrenal leg, not the whole relay each
 * time — narratively that's the adrenal being told to keep producing, not
 * a new signal originating each time, and it keeps the repeats as quick
 * as the original's single-edge pulses were.
 *
 * Continuity cue (director's-cut enhancement): a brief, fading gold point
 * at scene open, at the same position Scene 01's exit transition warms
 * toward ("the first glowing point remains, pulling us into Scene 02" —
 * see Scene01.tsx). This is the human-silhouette continuity the brief
 * asked for — reusing Scene 01's own body silhouette and its own exit
 * colour, not stock photography — and it's gone before the cascade above
 * begins in earnest, so it reads as a handoff, not a new element.
 */

const SCENE_DURATION_S = 51.5; // 49.95s of real narration + ~1.55s silent visual exit
const NARRATION_END_S = 49.95;

interface SubtitleCue {
  text: string;
  start: number;
  end: number;
}

// Verbatim Master Script §2. Timings are real-audio-derived (see file
// header) — not the invented placeholder timings from the original cut.
const SUBTITLES: SubtitleCue[] = [
  { start: 0.55, end: 4.85, text: "そういったサインが出ている時の@@多くのケースで" },
  { start: 4.85, end: 10.35, text: "今見ていただいているように@@唾液副腎ストレス検査では" },
  { start: 10.35, end: 15.35, text: "副腎というホルモンで作られる@@コルチゾールというホルモンが" },
  { start: 15.35, end: 19.35, text: "本来ですと何かストレスに@@対応するために" },
  { start: 19.35, end: 21.6, text: "たくさん作ることで代償的に" },
  { start: 21.6, end: 25.4, text: "あるいは体内のストレスに@@対応するために" },
  { start: 25.4, end: 30.45, text: "たくさん作られて@@コルチゾール高値が出るんですけれども" },
  { start: 30.45, end: 33.35, text: "多くの方でその段階を過ぎて" },
  { start: 33.35, end: 35.75, text: "ストレス期間が@@長く続きすぎて" },
  { start: 35.75, end: 42.55, text: "コルチゾールというホルモンそのものが@@副腎で作れなくなってしまっている状態" },
  { start: 42.55, end: 49.95, text: "つまりコルチゾールが低値ローという@@状態が出ている方っていうのが@@とっても多いです" },
];

const FULL_TRANSCRIPT =
  "そういったサインが出ている時の多くのケースで、今見ていただいているように唾液副腎ストレス検査では、副腎というホルモンで作られるコルチゾールというホルモンが、本来ですと何かストレスに対応するためにたくさん作ることで代償的に、あるいは体内のストレスに対して対応するためにたくさん作られて、コルチゾール高値が出るんですけれども、多くの方でその段階を過ぎて、ストレス期間が長く続きすぎて、コルチゾールというホルモンそのものが副腎で作れなくなってしまっている状態、つまりコルチゾールが低値ローという状態が出ている方っていうのがとっても多いです。";

// CG beat schedule, in seconds from scene start — re-anchored onto the
// real audio (see file header for method).
const BRAIN_APPEAR = 0.55;

// HPA relay: brain → hypothalamus → pituitary, each its own short
// draw-then-pulse beat, all landing before the original PATH_DRAW_END /
// FIRST_PULSE anchors below, which are unchanged from the pre-relay cut.
const HYPOTHALAMUS_PATH_DRAW_START = 0.7;
const HYPOTHALAMUS_PATH_DRAW_END = 1.5;
const HYPOTHALAMUS_APPEAR = 1.3;
const HYPOTHALAMUS_PULSE = 1.6; // dot travels brain -> hypothalamus, arrives and triggers this node's pulse
const HYPOTHALAMUS_LABEL_START = 1.6;
const HYPOTHALAMUS_LABEL_END = 2.8;

const PITUITARY_PATH_DRAW_START = 1.9;
const PITUITARY_PATH_DRAW_END = 2.7;
const PITUITARY_APPEAR = 2.5;
const PITUITARY_PULSE = 2.8; // dot travels hypothalamus -> pituitary
const PITUITARY_LABEL_START = 2.8;
const PITUITARY_LABEL_END = 4.4;

const PATH_DRAW_START = 3.1; // pituitary -> adrenal, the relay's final leg
const PATH_DRAW_END = 4.5;
const FIRST_PULSE = 5.55; // relay's arrival at the adrenal — unchanged anchor from the pre-relay cut
const LABEL_START = 6.7;
const LABEL_END = 10.6;
const EXTRA_PULSES = [15.1, 20.45, 25.55]; // repeated stimulation, matching "たくさん作ることで" / "たくさん作られて" — travels the pituitary->adrenal leg only, see file header
const DIM_START = 30.05; // "多くの方でその段階を過ぎて" — exhaustion begins
const DIM_END = 47.5;
const EXIT_START = NARRATION_END_S;

// Continuity cue: fades out well before the relay above begins in earnest.
const CONTINUITY_FADE_END = 2.5;

const brainPos = BODY_REGIONS.brain;
const hypothalamusPos = BODY_REGIONS.hypothalamus;
const pituitaryPos = BODY_REGIONS.pituitary;
const adrenalPos = BODY_REGIONS.adrenal;
const pathBrainToHypothalamus = curvedPath(brainPos.x, brainPos.y, hypothalamusPos.x, hypothalamusPos.y);
const pathHypothalamusToPituitary = curvedPath(hypothalamusPos.x, hypothalamusPos.y, pituitaryPos.x, pituitaryPos.y);
const pathPituitaryToAdrenal = curvedPath(pituitaryPos.x, pituitaryPos.y, adrenalPos.x, adrenalPos.y);
// Same position Scene 01's exit transition warms toward — see file header.
const continuityPoint = { x: BODY_REGIONS.adrenal.x, y: 90 };

// footageEnvelope now lives in lib/footageShot.ts, shared with every scene's footage config.

type PlayState = "idle" | "playing" | "done";

export function Scene02() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const [firedPulses, setFiredPulses] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      // Gated by this click, not autoplay — satisfies browser autoplay
      // policy, which only blocks playback started without a user gesture.
      void audio.play();
    }
  };

  const audioEl = <audio ref={audioRef} src="/audio/hi/scene02-narration.m4a" preload="auto" />;

  if (prefersReducedMotion) {
    return (
      <div>
        <div style={styles.frame}>
          <BodySilhouette opacity={0.14}>
            <svg viewBox={BODY_VIEWBOX} style={styles.overlaySvg}>
              <path d={pathBrainToHypothalamus} fill="none" stroke={hiColor.gold} strokeOpacity={0.28} strokeWidth={1.2} />
              <path d={pathHypothalamusToPituitary} fill="none" stroke={hiColor.gold} strokeOpacity={0.28} strokeWidth={1.2} />
              <path d={pathPituitaryToAdrenal} fill="none" stroke={hiColor.gold} strokeOpacity={0.28} strokeWidth={1.2} />
            </svg>
            <NodeAt pos={brainPos} organ="brain" state="healthy" />
            <NodeAt pos={hypothalamusPos} organ="hypothalamus" state="healthy" />
            <NodeAt pos={pituitaryPos} organ="pituitary" state="healthy" />
            <NodeAt pos={adrenalPos} organ="adrenal" state="depleted" />
          </BodySilhouette>
          <div style={styles.staticTranscript}>
            <p style={styles.staticTranscriptText}>{FULL_TRANSCRIPT}</p>
          </div>
        </div>
        {audioEl}
        <div style={styles.controls}>
          <button onClick={play} style={styles.playButton} disabled={playState === "playing"}>
            {playState === "playing" ? "Playing…" : playState === "done" ? "Replay narration" : "Play narration"}
          </button>
        </div>
      </div>
    );
  }

  const activeSubtitle = SUBTITLES.find((s) => elapsed >= s.start && elapsed < s.end);
  const inExit = elapsed >= EXIT_START;
  const exitProgress = inExit ? Math.min(1, (elapsed - EXIT_START) / (SCENE_DURATION_S - EXIT_START)) : 0;

  const brainVisible = elapsed >= BRAIN_APPEAR;
  const hypothalamusVisible = elapsed >= HYPOTHALAMUS_APPEAR;
  const pituitaryVisible = elapsed >= PITUITARY_APPEAR;

  const hypothalamusPathProgress = Math.min(
    1,
    Math.max(0, (elapsed - HYPOTHALAMUS_PATH_DRAW_START) / (HYPOTHALAMUS_PATH_DRAW_END - HYPOTHALAMUS_PATH_DRAW_START))
  );
  const pituitaryPathProgress = Math.min(
    1,
    Math.max(0, (elapsed - PITUITARY_PATH_DRAW_START) / (PITUITARY_PATH_DRAW_END - PITUITARY_PATH_DRAW_START))
  );
  const pathProgress = Math.min(1, Math.max(0, (elapsed - PATH_DRAW_START) / (PATH_DRAW_END - PATH_DRAW_START)));

  // Relay pulses — each a single one-time window, not repeating (unlike
  // the adrenal's pulseActive below, which also covers EXTRA_PULSES).
  const hypothalamusPulseActive = elapsed >= HYPOTHALAMUS_PULSE && elapsed < HYPOTHALAMUS_PULSE + 0.9;
  const pituitaryPulseActive = elapsed >= PITUITARY_PULSE && elapsed < PITUITARY_PULSE + 0.9;

  const hypothalamusLabelOpacity =
    elapsed >= HYPOTHALAMUS_LABEL_START && elapsed < HYPOTHALAMUS_LABEL_END
      ? Math.min(1, (elapsed - HYPOTHALAMUS_LABEL_START) / 0.4, (HYPOTHALAMUS_LABEL_END - elapsed) / 0.4)
      : 0;
  const pituitaryLabelOpacity =
    elapsed >= PITUITARY_LABEL_START && elapsed < PITUITARY_LABEL_END
      ? Math.min(1, (elapsed - PITUITARY_LABEL_START) / 0.4, (PITUITARY_LABEL_END - elapsed) / 0.4)
      : 0;
  const adrenalLabelOpacity =
    elapsed >= LABEL_START && elapsed < LABEL_END
      ? Math.min(1, (elapsed - LABEL_START) / 0.5, (LABEL_END - elapsed) / 0.5)
      : 0;

  const continuityOpacity = Math.max(0, 1 - elapsed / CONTINUITY_FADE_END) * 0.5;

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

  // Live-action layer (Concept 1, approved) — see lib/scene02Footage.ts.
  // Each shot's crossfade is independent; they don't overlap in time, so
  // summing is equivalent to taking whichever one is currently active.
  const footageOpacities = SCENE02_FOOTAGE.map((shot) => footageEnvelope(elapsed, shot));
  const totalFootageOpacity = Math.min(1, footageOpacities.reduce((sum, o) => sum + o, 0));

  return (
    <div>
      <div style={styles.frame}>
        <div
          style={{
            ...styles.sceneInner,
            opacity: (playState === "idle" ? 0 : 1) * (1 - totalFootageOpacity),
            transition: "opacity 1000ms ease-in",
          }}
        >
          <BodySilhouette opacity={0.14}>
            <svg viewBox={BODY_VIEWBOX} style={styles.overlaySvg} aria-hidden="true">
              {/* Continuity cue — echoes Scene 01's exit point, then is gone before the relay below begins. See file header. */}
              {continuityOpacity > 0 && (
                <circle cx={continuityPoint.x} cy={continuityPoint.y} r={7} fill={hiOrganColor.adrenal} opacity={continuityOpacity} style={{ filter: "blur(3px)" }} />
              )}

              {/* HPA relay, one edge at a time: brain -> hypothalamus -> pituitary -> adrenal. Each edge draws on, then a dot travels it. */}
              <path
                d={pathBrainToHypothalamus}
                fill="none"
                stroke={hiColor.gold}
                strokeOpacity={0.28}
                strokeWidth={1.2}
                strokeDasharray={1}
                pathLength={1}
                style={{ strokeDashoffset: 1 - hypothalamusPathProgress }}
              />
              <path
                d={pathHypothalamusToPituitary}
                fill="none"
                stroke={hiColor.gold}
                strokeOpacity={0.28}
                strokeWidth={1.2}
                strokeDasharray={1}
                pathLength={1}
                style={{ strokeDashoffset: 1 - pituitaryPathProgress }}
              />
              <path
                d={pathPituitaryToAdrenal}
                fill="none"
                stroke={hiColor.gold}
                strokeOpacity={0.28}
                strokeWidth={1.2}
                strokeDasharray={1}
                pathLength={1}
                style={{ strokeDashoffset: 1 - pathProgress }}
              />

              {hypothalamusPulseActive && (
                <circle r={3} fill={hiColor.gold} style={{ offsetPath: `path("${pathBrainToHypothalamus}")`, animation: "hi-signal-travel-kf 900ms linear" }} />
              )}
              {pituitaryPulseActive && (
                <circle r={3} fill={hiColor.gold} style={{ offsetPath: `path("${pathHypothalamusToPituitary}")`, animation: "hi-signal-travel-kf 900ms linear" }} />
              )}
              {/* Travelling signal on the final leg — fires at the relay's arrival and at each repeated-stimulation pulse. */}
              {pulseActive && (
                <circle r={3} fill={hiColor.gold} style={{ offsetPath: `path("${pathPituitaryToAdrenal}")`, animation: "hi-signal-travel-kf 900ms linear" }} />
              )}

              {inExit && (
                <>
                  <path d={pathBrainToHypothalamus} fill="none" stroke={hiColor.gold} strokeOpacity={0.28 * (1 - exitProgress)} strokeWidth={1.2} />
                  <path d={pathHypothalamusToPituitary} fill="none" stroke={hiColor.gold} strokeOpacity={0.28 * (1 - exitProgress)} strokeWidth={1.2} />
                  <path d={pathPituitaryToAdrenal} fill="none" stroke={hiColor.gold} strokeOpacity={0.28 * (1 - exitProgress)} strokeWidth={1.2} />
                </>
              )}
            </svg>

            {brainVisible && (
              <NodeAt pos={brainPos} organ="brain" state="healthy" style={{ opacity: inExit ? 1 - exitProgress : 1, transition: "opacity 800ms ease-out" }} />
            )}

            {hypothalamusVisible && (
              <NodeAt
                pos={hypothalamusPos}
                organ="hypothalamus"
                state="healthy"
                pulse={hypothalamusPulseActive}
                style={{ opacity: inExit ? 1 - exitProgress : 1, transition: "opacity 800ms ease-out" }}
              />
            )}

            {pituitaryVisible && (
              <NodeAt
                pos={pituitaryPos}
                organ="pituitary"
                state="healthy"
                pulse={pituitaryPulseActive}
                style={{ opacity: inExit ? 1 - exitProgress : 1, transition: "opacity 800ms ease-out" }}
              />
            )}

            <NodeAt
              pos={adrenalPos}
              organ="adrenal"
              state="healthy"
              pulse={pulseActive}
              style={{ opacity: inExit ? adrenalEnvelope * (1 - exitProgress * 0.4) : adrenalEnvelope, transition: "opacity 300ms linear" }}
            />

            {hypothalamusLabelOpacity > 0 && (
              <div
                style={{
                  ...styles.organLabel,
                  left: `${((hypothalamusPos.x + 24) / 200) * 100}%`,
                  top: `${(hypothalamusPos.y / 280) * 100}%`,
                  opacity: hypothalamusLabelOpacity,
                }}
              >
                {hiOrganLabelJa.hypothalamus}
              </div>
            )}

            {pituitaryLabelOpacity > 0 && (
              <div
                style={{
                  ...styles.organLabel,
                  left: `${((pituitaryPos.x + 24) / 200) * 100}%`,
                  top: `${(pituitaryPos.y / 280) * 100}%`,
                  opacity: pituitaryLabelOpacity,
                }}
              >
                {hiOrganLabelJa.pituitary}
              </div>
            )}

            {adrenalLabelOpacity > 0 && (
              <div
                style={{
                  ...styles.organLabel,
                  left: `${(adrenalPos.x / 200) * 100}%`,
                  top: `${((adrenalPos.y + 26) / 280) * 100}%`,
                  opacity: adrenalLabelOpacity,
                }}
              >
                {hiOrganLabelJa.adrenal}
              </div>
            )}
          </BodySilhouette>

          {/* inExit's canvas-colour dissolve is only meant to cover the diagram — once the ending shot is covering the frame in its own right, this would otherwise double up on top of it. */}
          <div style={{ ...styles.dissolveOverlay, opacity: inExit ? exitProgress * 0.85 * (1 - totalFootageOpacity) : 0 }} />
        </div>

        {/* Live-action layer (Concept 1) — sits above the diagram, below the subtitles, so narration stays legible over footage exactly as it does over the diagram. See lib/scene02Footage.ts. */}
        {SCENE02_FOOTAGE.map((shot, i) => (
          <FootageSlot key={shot.id} shot={shot} opacity={footageOpacities[i]} />
        ))}

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

        <p style={styles.srOnly}>{FULL_TRANSCRIPT}</p>
      </div>

      {audioEl}

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
  organ: "brain" | "hypothalamus" | "pituitary" | "adrenal";
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
