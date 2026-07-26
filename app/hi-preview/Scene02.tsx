"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hiColor } from "../components/hi/tokens";
import { usePrefersReducedMotion } from "../components/hi/OrganNode";
import { MechanismDiagram } from "../components/hi/MechanismDiagram";

/**
 * Scene 02 — HPA-axis mechanism. [0:39–1:29 in Master Script v1.0 §2, real
 * narration length 49.95s]
 *
 * Scientific question this scene answers, and only this: "How does the
 * HPA axis normally produce cortisol?" Per the one-scene-one-question
 * rule, the circadian graph and lab report (§3's content, [1:29–2:15])
 * do not appear here — they belong to Scene 03, which should open with
 * the circadian graph and transition into the report/symptom
 * correlation, matching where their narration actually begins.
 *
 * Audio: public/audio/hi/scene02-narration.m4a — the real §2 narration,
 * trimmed at genuine silence boundaries (verified against amplitude, not
 * just ASR — see commit notes) starting 39.55s into the source
 * recording (0.53s natural lead-in silence baked into the file) and
 * ending at the natural pause before §3 begins. Every timing constant
 * below is derived from this file, not invented: cue boundaries were
 * anchored to the two strongest verified landmarks (real speech onset,
 * and the 1.4s pivot pause between "…出るんですけれども" and "多くの方
 * でその段階を過ぎて") and proportioned by character count between them.
 * This is a first, well-reasoned pass for your review — not a locked
 * final sync.
 *
 * MechanismDiagram runs in controlled mode (activeIndex prop) rather
 * than its own internal timer, so this scene's elapsed clock — not the
 * component's default loop — drives which organ is highlighted,
 * matching the narration's real pacing.
 */

const SCENE_DURATION_S = 51.5; // 49.95s of narration + ~1.5s silent visual exit
const NARRATION_END_S = 49.95;
const EXIT_START = NARRATION_END_S;

interface SubtitleCue {
  text: string;
  start: number;
  end: number;
}

// Verbatim Master Script §2. Timings are real-audio-derived (see file
// header) — not the invented placeholder timings from the previous cut.
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

// Which MechanismDiagram step is highlighted, in seconds from scene
// start — content-anchored, not evenly spaced: the narration spends most
// of its time describing what happens at the adrenal gland (production,
// then depletion), so the adrenal step owns the back half of the scene.
// (brain is the implicit index-0 state before STEP_HYPOTHALAMUS_START)
const STEP_HYPOTHALAMUS_START = 10.35; // "副腎というホルモンで作られる…"
const STEP_PITUITARY_START = 19.35; // "たくさん作ることで代償的に…"
const STEP_ADRENAL_START = 25.4; // "たくさん作られてコルチゾール高値が出る…"

// Adrenal state swap: stays healthy through the "high production"
// narration (cue 7), then switches to depleted partway through "長く続
// きすぎて…作れなくなってしまっている状態" (cue 9/10) as exhaustion is
// described — OrganNode's state model is discrete, so this is a single
// swap rather than a continuous fade, timed to land mid-sentence rather
// than at a cue boundary so it doesn't read as a hard cut.
const DIM_AT = 39.0;

const MECHANISM_STEPS = [{ organ: "brain" }, { organ: "hypothalamus" }, { organ: "pituitary" }, { organ: "adrenal" }] as const;

type PlayState = "idle" | "playing" | "done";

export function Scene02() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
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
    setPlayState("playing");
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      // Gated by this click, not autoplay — satisfies browser autoplay
      // policy, which only blocks playback started without a user gesture.
      void audio.play();
    }
  };

  const adrenalVitality: "healthy" | "depleted" = elapsed < DIM_AT ? "healthy" : "depleted";
  const steps = MECHANISM_STEPS.map((s) => (s.organ === "adrenal" ? { ...s, vitality: adrenalVitality } : s));

  const audioEl = <audio ref={audioRef} src="/audio/hi/scene02-narration.m4a" preload="auto" />;

  // Reduced motion / static: full diagram at its end-state, transcript
  // for reading, and the same audio + Play control so narration is still
  // available — audio isn't the motion prefers-reduced-motion asks us to
  // avoid, only the timed visual choreography is.
  if (prefersReducedMotion) {
    return (
      <div>
        <div style={styles.frame}>
          <div style={{ ...styles.sceneInner, position: "relative", overflow: "auto", padding: "20px 16px" }}>
            <MechanismDiagram steps={steps} activeIndex={3} disableAnimation />
          </div>
          <p style={styles.srOnly}>{FULL_TRANSCRIPT}</p>
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

  const activeStepIndex =
    elapsed >= STEP_ADRENAL_START ? 3 : elapsed >= STEP_PITUITARY_START ? 2 : elapsed >= STEP_HYPOTHALAMUS_START ? 1 : 0;

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
          <div style={styles.actLayer}>
            <MechanismDiagram steps={steps} activeIndex={activeStepIndex} active={playState === "playing" && !inExit} />
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

      {audioEl}

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
