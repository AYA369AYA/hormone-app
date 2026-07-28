"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hiColor, hiOrganColor, hiOrganLabelJa } from "../components/hi/tokens";
import { OrganNode, usePrefersReducedMotion } from "../components/hi/OrganNode";
import { BodySilhouette, BODY_REGIONS, BODY_VIEWBOX } from "../components/hi/BodySilhouette";
import { curvedPath } from "../components/hi/SignalPath";
import { FootageSlot } from "../components/hi/FootageSlot";
import { Gauge } from "../components/hi/Gauge";
import { PROGESTERONE_FOOTAGE } from "../../lib/progesteroneFootage";
import { footageEnvelope } from "../../lib/footageShot";

/**
 * Progesterone — flagship scene.
 *
 * Visual structure (per project_hormone_intelligence_visual_language):
 * Human life -> internal science -> insight -> human agency. Same
 * architecture as Scene 02 (OrganNode/BodySilhouette/curvedPath,
 * FootageSlot config-driven live-action layer) — new here: the ovary as
 * source node instead of the brain, a *reversed* signal direction (ovary
 * up to the brain, not brain down to an organ), and one new Science
 * Library asset, the Gauge, for the P4/E2 ratio beat.
 *
 * Audio: public/audio/hi/progesterone-narration.m4a — trimmed from the
 * project's master narration file (Downloads/Cortisol Daily, Tot.mp4),
 * Master Script §6 [6:24–8:59], the same way Scene 02's audio was trimmed
 * from the same master file. Real speech boundaries were found via
 * amplitude-based silence detection, not guessed: the file runs 153.3s,
 * speech starting ~0.5s in (natural lead-in preserved) and ending ~152.8s.
 *
 * Subtitle timing: no word-level transcription exists for this clip, so
 * cue boundaries are proportioned by character count of each verbatim
 * sentence across the real speech span — the same methodology Scene 02's
 * header documents ("anchored to verified landmarks... proportioned by
 * character count between them"), here without a strong internal landmark
 * to anchor against beyond the span's own start/end. A first, well-
 * reasoned pass, not a locked final sync.
 *
 * One clause in this section — the "200x reference population" aside —
 * is flagged UNRESOLVED in the Master Script's own verification log
 * (~15% confidence, "no safe reconstruction is possible"). It is not
 * captioned here, matching how this project has handled every other
 * UNRESOLVED clause: no invented words stand in for uncertain source
 * text. That silent stretch [104.6s-131.5s] is where the calming-signal
 * beat and the mid-scene footage gesture are placed — there was never a
 * source line for the GABA-mediated calming mechanism either, so this is
 * the one part of the scene that was always going to run without
 * dialogue; it now also happens to be the one stretch of real audio with
 * no reliable caption, which is a fitting coincidence, not a contrivance.
 *
 * Live-action: three shots (opening, safety-release, quiet-intention),
 * defined in lib/progesteroneFootage.ts, all placeholders pending stand-in
 * imagery. Swapping them is a config-only change — see FootageSlot.
 *
 * Coverage-gap fixes (approved individually, see conversation record):
 * Gap 1 — "many hormones" shimmer, 9-16.5s, four independently-staggered
 * faint points near the ovary, gone with real margin before the labeled
 * branches begin. Gap 2 — Gauge fade-in moved from 58.0/61.0 to 53.0/55.0
 * so it arrives during, not after, the sentence introducing the ratio.
 * Gap 3 — a second, faint warm tone briefly coexists with the ovary's
 * glow during the negation clause "女性ホルモンではなく" (33.9-35.0s);
 * flagged as a partial solve, not a full one — negation has no clean
 * representation in this visual language. Gap 4 — one gentle opacity
 * breath on the Gauge's track (not its progress arc) during the
 * "何と何のバランスなのか" rhetorical aside (82-93s).
 */

const SCENE_DURATION_S = 154.8;
const NARRATION_END_S = 153.3;

interface SubtitleCue {
  text: string;
  start: number;
  end: number;
}

// Verbatim Master Script §6 [6:24–8:59], proportioned across the real
// speech span (see file header). One clause (the reference-population
// aside) is skipped entirely — flagged UNRESOLVED in the source, not
// captioned here or anywhere else in this project.
const SUBTITLES: SubtitleCue[] = [
  { start: 0.5, end: 9.0, text: "今見ていただいているのは@@唾液女性ホルモン検査という検査なんですけども、" },
  { start: 9.0, end: 16.0, text: "この検査でもたくさんいろんなホルモンを@@見ていくんですが、" },
  { start: 16.0, end: 33.9, text: "一番大事なのは、いろんなホルモンの材料の@@大元になっている一番上のプロゲステロンという@@ホルモンに注目していただいています。" },
  { start: 33.9, end: 40.0, text: "このプロゲステロンっていうのは@@女性ホルモンではなく、" },
  { start: 40.0, end: 50.0, text: "女性ホルモンであるエストロゲンや@@男性ホルモンなどの材料に値する部分なんです。" },
  { start: 50.0, end: 61.0, text: "そのプロゲステロンというホルモンから@@女性ホルモンであるエストロゲンが@@どれぐらいの割合でできているのか、" },
  { start: 61.0, end: 73.5, text: "それをP4/E2比っていうふうにして、@@ホルモンバランス値っていうのを@@お一人お一人チェックしていくんですけれども、@@その数値っていうものが非常に大事になってきます。" },
  { start: 73.5, end: 82.0, text: "これは唾液ホルモン検査で@@唯一見ていただける数値になるんですけれども。" },
  { start: 82.0, end: 93.0, text: "ホルモンバランスって聞きますと、@@何と何のバランスなのかっていう疑問も@@持たれる方もいらっしゃるかなと思うんですが、" },
  { start: 93.0, end: 104.6, text: "これがプロゲステロンっていう大元の材料から、@@女性ホルモンであるエストロゲンが@@どれぐらいの割合でできているのか、" },
  // [104.6–131.5: UNRESOLVED reference-population clause — not captioned, see file header]
  { start: 131.5, end: 145.0, text: "プロゲステロンからエストロゲンが@@どれぐらいの割合できるのか、@@ホルモンバランス値というふうにご紹介したんですけども、" },
  { start: 145.0, end: 152.7, text: "それが200倍っていうものが@@一つ目安としてあります。" },
];

// Full verbatim text, including the silent/unresolved stretch, for the
// screen-reader transcript — accessibility shouldn't lose the one clause
// visual captions skip, even though we don't have a confident reading of
// its exact wording. See file header.
const FULL_TRANSCRIPT =
  SUBTITLES.slice(0, 10)
    .map((s) => s.text.replaceAll("@@", ""))
    .join("") +
  "（この間の一節は音声の不明瞭な箇所のため字幕を省略しています）" +
  SUBTITLES.slice(10)
    .map((s) => s.text.replaceAll("@@", ""))
    .join("");

// Ovary hub — source node for this scene (mirrors Scene 02's brain-as-source).
const OVARY_APPEAR = 1.0;
const OVARY_GLOW_RAMP_END = 4.0;

const ovaryPos = BODY_REGIONS.ovaries;
const bonePos = BODY_REGIONS.bone;
const brainPos = BODY_REGIONS.brain;
// Branch endpoints for estrogen/testosterone — not organs, so rendered as
// small labeled gold points rather than an OrganNode shape (see file
// header — no shape exists for a hormone, only for a body part).
const estrogenPos = { x: ovaryPos.x - 20, y: 150 };
const testosteronePos = { x: ovaryPos.x + 20, y: 150 };

const pathOvaryToEstrogen = curvedPath(ovaryPos.x, ovaryPos.y, estrogenPos.x, estrogenPos.y);
const pathOvaryToTestosterone = curvedPath(ovaryPos.x, ovaryPos.y, testosteronePos.x, testosteronePos.y);
const pathOvaryToBone = curvedPath(ovaryPos.x, ovaryPos.y, bonePos.x, bonePos.y);
// The calming branch — reversed direction from Scene 02's brain->adrenal
// cascade, a deliberate visual rhyme between the two flagship scenes.
const pathOvaryToBrain = curvedPath(ovaryPos.x, ovaryPos.y, brainPos.x, brainPos.y);

// "Many hormones" shimmer (Gap 1 fix) — anchored to "この検査でもたくさん
// いろんなホルモンを見ていくんですが" (9.0-16.0s). Deliberately not the
// real branches: fewer points, no labels, no connecting lines, positioned
// tighter around the ovary than the real branch endpoints, and fully
// faded out well before ESTROGEN_DRAW_START so it can never be mistaken
// for the labeled branch reveal that follows. Visual weight capped at 0.3
// opacity — quieter than every other node in the scene, matching the
// ambient-breathing register rather than a new focal element.
// Each point gets its own small phase offset and hold length — a group
// that faded in/out in perfect unison would read as "an animation
// playing," which is the opposite of what this is for. Staggered and
// this quiet, it should sit below the threshold of conscious notice.
const MANY_HORMONES_SHIMMER_POS = [
  { x: 85, y: 165, delay: 0.0, holdS: 3.2 },
  { x: 115, y: 165, delay: 0.6, holdS: 2.6 },
  { x: 90, y: 200, delay: 1.3, holdS: 3.6 },
  { x: 110, y: 200, delay: 0.9, holdS: 2.9 },
];
const MANY_HORMONES_SHIMMER_WINDOW_START = 9.0;
const MANY_HORMONES_SHIMMER_FADE_MS = 1800; // slow in, slower out — no hard edge to notice
const MANY_HORMONES_SHIMMER_PEAK_OPACITY = 0.2;

// Branches — anchored to "エストロゲンや男性ホルモンなどの材料に値する部分" (~40-50s).
const ESTROGEN_DRAW_START = 35.0;
const ESTROGEN_DRAW_END = 40.0;
const ESTROGEN_LABEL_START = 39.0;
const ESTROGEN_LABEL_END = 44.0;

const TESTOSTERONE_DRAW_START = 40.0;
const TESTOSTERONE_DRAW_END = 45.0;
const TESTOSTERONE_LABEL_START = 44.0;
const TESTOSTERONE_LABEL_END = 49.0;

const BONE_DRAW_START = 45.0;
const BONE_DRAW_END = 50.0;
const BONE_APPEAR = 48.0;
const BONE_LABEL_START = 49.0;
const BONE_LABEL_END = 54.0;

// Gauge (Gap 2 fix, approved): fade-in moved from 58.0/61.0 to 53.0/55.0
// so it arrives *during* "そのプロゲステロンというホルモンから...どれぐらい
// の割合でできているのか" (~50-58s) instead of after that sentence ends —
// closes the ~8s dead-air gap where branches had finished but nothing new
// had appeared yet. GAUGE_PROGRESS_START stays at 61.0, unchanged, still
// tied to "P4/E2比" being spoken; only the arrival was moved earlier.
// Progress still resolves right as "200倍" is spoken (~145-152.7s).
const GAUGE_START = 53.0;
const GAUGE_FULL = 55.0;
const GAUGE_PROGRESS_START = 61.0;
const GAUGE_PROGRESS_END = 150.0;

// Ovary dual-tone (Gap 3 fix, approved — partial solve, see proposal): a
// second, faint warm tone briefly coexists with the ovary's real glow
// during "女性ホルモンではなく" (the negation clause), settling back to
// the single gold tone as the sentence pivots to its positive claim and
// the branches begin drawing. Concentrated at the *start* of this
// sentence's window (33.9-35.0) rather than its full span, since the
// negation itself is the clause's first few words — "エストロゲンや
// 男性ホルモンなどの材料に値する部分" (the positive claim the branches
// represent) comes after, and shouldn't visually compete with this cue.
// Uses hiOrganColor.hypothalamus — an existing warm-family token, not a
// new hue — as the second tone against the ovary's own hiOrganColor.ovaries.
const OVARY_DUAL_TONE_FADE_IN_END = 34.3;
const OVARY_DUAL_TONE_HOLD_END = 34.6;
const OVARY_DUAL_TONE_FADE_OUT_END = 35.0;
// Raised from 0.35 — the first version was correctly timed but rendered
// underneath the opaque ovary node and was therefore invisible regardless
// of opacity. Now that it paints on top (see render below), 0.55 reads as
// a clear, brief bloom rather than the near-nothing 0.35 would look like
// once actually visible.
const OVARY_DUAL_TONE_PEAK_OPACITY = 0.55;

// Gauge track emphasis (Gap 4 fix, approved): the track visibly *breathes*
// twice — not one slow drift over 11s, which doesn't read as motion at
// normal viewing speed. Two full up/down cycles during "ホルモンバランス
// って聞きますと、何と何のバランスなのかっていう疑問も持たれる方も..."
// so the scene visibly "points back" at the gauge as the question is
// raised, rather than a change too gradual to notice.
const GAUGE_EMPHASIS_PULSE_1_PEAK = 84.5;
const GAUGE_EMPHASIS_PULSE_1_END = 87.0;
const GAUGE_EMPHASIS_PULSE_2_PEAK = 89.5;
const GAUGE_EMPHASIS_PULSE_2_END = 92.0;
const GAUGE_EMPHASIS_START = 82.0;

// Calming branch + brain warmth — placed in the silent/unresolved stretch
// (see file header): this beat never had a source line anyway, and now
// shares the one part of the real audio with no reliable caption.
const CALMING_DRAW_START = 106.0;
const CALMING_DRAW_END = 112.0;
const CALMING_PULSE = 112.5;
const BRAIN_WARMTH_START = 112.5;
const BRAIN_WARMTH_END = 125.0;

type PlayState = "idle" | "playing" | "done";

export function SceneProgesterone() {
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
      void audio.play();
    }
  };

  const audioEl = <audio ref={audioRef} src="/audio/hi/progesterone-narration.m4a" preload="auto" />;

  if (prefersReducedMotion) {
    return (
      <div>
        <div style={styles.frame}>
          <BodySilhouette opacity={0.14}>
            <svg viewBox={BODY_VIEWBOX} style={styles.overlaySvg}>
              <path d={pathOvaryToEstrogen} fill="none" stroke={hiColor.gold} strokeOpacity={0.28} strokeWidth={1.2} />
              <path d={pathOvaryToTestosterone} fill="none" stroke={hiColor.gold} strokeOpacity={0.28} strokeWidth={1.2} />
              <path d={pathOvaryToBone} fill="none" stroke={hiColor.gold} strokeOpacity={0.28} strokeWidth={1.2} />
              <path d={pathOvaryToBrain} fill="none" stroke={hiColor.gold} strokeOpacity={0.28} strokeWidth={1.2} />
            </svg>
            <NodeAt pos={ovaryPos} organ="ovaries" />
            <NodeAt pos={bonePos} organ="bone" />
            <NodeAt pos={brainPos} organ="brain" />
            <HormoneEndpoint pos={estrogenPos} />
            <HormoneEndpoint pos={testosteronePos} />
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

  const ovaryOpacity = elapsed < OVARY_APPEAR ? 0 : Math.min(1, (elapsed - OVARY_APPEAR) / (OVARY_GLOW_RAMP_END - OVARY_APPEAR));

  // "Many hormones" shimmer — each point fades independently (see const
  // block above): no synchronized group motion to notice consciously.
  const manyHormonesShimmerOpacities = MANY_HORMONES_SHIMMER_POS.map((p) => {
    const holdStart = MANY_HORMONES_SHIMMER_WINDOW_START + p.delay;
    const holdEnd = holdStart + p.holdS;
    return footageEnvelope(elapsed, {
      holdStart,
      holdEnd,
      fadeInMs: MANY_HORMONES_SHIMMER_FADE_MS,
      fadeOutMs: MANY_HORMONES_SHIMMER_FADE_MS,
    }) * MANY_HORMONES_SHIMMER_PEAK_OPACITY;
  });

  // Ovary dual-tone (Gap 3) — see const block above.
  let ovaryDualToneOpacity = 0;
  if (elapsed >= 33.9 && elapsed < OVARY_DUAL_TONE_FADE_IN_END) {
    ovaryDualToneOpacity = (elapsed - 33.9) / (OVARY_DUAL_TONE_FADE_IN_END - 33.9);
  } else if (elapsed < OVARY_DUAL_TONE_HOLD_END) {
    ovaryDualToneOpacity = 1;
  } else if (elapsed < OVARY_DUAL_TONE_FADE_OUT_END) {
    ovaryDualToneOpacity = 1 - (elapsed - OVARY_DUAL_TONE_HOLD_END) / (OVARY_DUAL_TONE_FADE_OUT_END - OVARY_DUAL_TONE_HOLD_END);
  }
  ovaryDualToneOpacity = Math.max(0, Math.min(1, ovaryDualToneOpacity)) * OVARY_DUAL_TONE_PEAK_OPACITY;

  // Gauge track emphasis (Gap 4) — two clear breaths, not one slow drift.
  function pulseEnvelope(t: number, start: number, peak: number, end: number): number {
    if (t >= start && t < peak) return (t - start) / (peak - start);
    if (t >= peak && t < end) return 1 - (t - peak) / (end - peak);
    return 0;
  }
  const gaugeTrackEmphasis = Math.max(
    pulseEnvelope(elapsed, GAUGE_EMPHASIS_START, GAUGE_EMPHASIS_PULSE_1_PEAK, GAUGE_EMPHASIS_PULSE_1_END),
    pulseEnvelope(elapsed, GAUGE_EMPHASIS_PULSE_1_END, GAUGE_EMPHASIS_PULSE_2_PEAK, GAUGE_EMPHASIS_PULSE_2_END)
  );

  const estrogenPathProgress = Math.min(1, Math.max(0, (elapsed - ESTROGEN_DRAW_START) / (ESTROGEN_DRAW_END - ESTROGEN_DRAW_START)));
  const testosteronePathProgress = Math.min(1, Math.max(0, (elapsed - TESTOSTERONE_DRAW_START) / (TESTOSTERONE_DRAW_END - TESTOSTERONE_DRAW_START)));
  const bonePathProgress = Math.min(1, Math.max(0, (elapsed - BONE_DRAW_START) / (BONE_DRAW_END - BONE_DRAW_START)));
  const boneVisible = elapsed >= BONE_APPEAR;

  const estrogenLabelOpacity =
    elapsed >= ESTROGEN_LABEL_START && elapsed < ESTROGEN_LABEL_END
      ? Math.min(1, (elapsed - ESTROGEN_LABEL_START) / 0.4, (ESTROGEN_LABEL_END - elapsed) / 0.4)
      : 0;
  const testosteroneLabelOpacity =
    elapsed >= TESTOSTERONE_LABEL_START && elapsed < TESTOSTERONE_LABEL_END
      ? Math.min(1, (elapsed - TESTOSTERONE_LABEL_START) / 0.4, (TESTOSTERONE_LABEL_END - elapsed) / 0.4)
      : 0;
  const boneLabelOpacity =
    elapsed >= BONE_LABEL_START && elapsed < BONE_LABEL_END
      ? Math.min(1, (elapsed - BONE_LABEL_START) / 0.4, (BONE_LABEL_END - elapsed) / 0.4)
      : 0;

  const gaugeOpacity = elapsed >= GAUGE_START ? Math.min(1, (elapsed - GAUGE_START) / (GAUGE_FULL - GAUGE_START)) : 0;
  const gaugeProgress = Math.min(1, Math.max(0, (elapsed - GAUGE_PROGRESS_START) / (GAUGE_PROGRESS_END - GAUGE_PROGRESS_START)));

  const calmingPathProgress = Math.min(1, Math.max(0, (elapsed - CALMING_DRAW_START) / (CALMING_DRAW_END - CALMING_DRAW_START)));
  const calmingPulseActive = elapsed >= CALMING_PULSE && elapsed < CALMING_PULSE + 0.9;

  // Brain warmth envelope: a rise, not a dim — the inverse of Scene 02's
  // adrenal depletion. Progesterone's calming signal arrives and settles.
  let brainWarmth = 0;
  if (elapsed >= BRAIN_WARMTH_START) {
    if (elapsed < BRAIN_WARMTH_END) {
      const t = (elapsed - BRAIN_WARMTH_START) / (BRAIN_WARMTH_END - BRAIN_WARMTH_START);
      brainWarmth = t * t * (3 - 2 * t); // smoothstep
    } else {
      brainWarmth = 1;
    }
  }

  const footageOpacities = PROGESTERONE_FOOTAGE.map((shot) => footageEnvelope(elapsed, shot));
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
              {/* "Many hormones" shimmer (Gap 1) — no labels, no connecting lines, gone well before the real branches draw. */}
              {MANY_HORMONES_SHIMMER_POS.map((p, i) =>
                manyHormonesShimmerOpacities[i] > 0 ? (
                  <circle key={i} cx={p.x} cy={p.y} r={3} fill={hiColor.gold} opacity={manyHormonesShimmerOpacities[i]} style={{ filter: "blur(3px)" }} />
                ) : null
              )}

              <path
                d={pathOvaryToEstrogen}
                fill="none"
                stroke={hiColor.gold}
                strokeOpacity={0.28}
                strokeWidth={1.2}
                strokeDasharray={1}
                pathLength={1}
                style={{ strokeDashoffset: 1 - estrogenPathProgress }}
              />
              <path
                d={pathOvaryToTestosterone}
                fill="none"
                stroke={hiColor.gold}
                strokeOpacity={0.28}
                strokeWidth={1.2}
                strokeDasharray={1}
                pathLength={1}
                style={{ strokeDashoffset: 1 - testosteronePathProgress }}
              />
              <path
                d={pathOvaryToBone}
                fill="none"
                stroke={hiColor.gold}
                strokeOpacity={0.28}
                strokeWidth={1.2}
                strokeDasharray={1}
                pathLength={1}
                style={{ strokeDashoffset: 1 - bonePathProgress }}
              />
              <path
                d={pathOvaryToBrain}
                fill="none"
                stroke={hiColor.gold}
                strokeOpacity={0.28}
                strokeWidth={1.2}
                strokeDasharray={1}
                pathLength={1}
                style={{ strokeDashoffset: 1 - calmingPathProgress }}
              />

              {calmingPulseActive && (
                <circle r={3} fill={hiColor.gold} style={{ offsetPath: `path("${pathOvaryToBrain}")`, animation: "hi-signal-travel-kf 900ms linear" }} />
              )}
            </svg>

            {ovaryOpacity > 0 && <NodeAt pos={ovaryPos} organ="ovaries" style={{ opacity: ovaryOpacity, transition: "opacity 300ms linear" }} />}

            {estrogenPathProgress > 0 && <HormoneEndpoint pos={estrogenPos} opacity={estrogenPathProgress} />}
            {testosteronePathProgress > 0 && <HormoneEndpoint pos={testosteronePos} opacity={testosteronePathProgress} />}
            {boneVisible && <NodeAt pos={bonePos} organ="bone" style={{ opacity: bonePathProgress, transition: "opacity 300ms linear" }} />}

            <NodeAt
              pos={brainPos}
              organ="brain"
              style={{ opacity: Math.max(0.5, brainWarmth), transition: "opacity 600ms ease-out" }}
            />

            {estrogenLabelOpacity > 0 && (
              <div style={{ ...styles.organLabel, left: `${((estrogenPos.x - 26) / 200) * 100}%`, top: `${(estrogenPos.y / 280) * 100}%`, opacity: estrogenLabelOpacity }}>
                エストロゲン
              </div>
            )}
            {testosteroneLabelOpacity > 0 && (
              <div
                style={{ ...styles.organLabel, left: `${((testosteronePos.x + 30) / 200) * 100}%`, top: `${(testosteronePos.y / 280) * 100}%`, opacity: testosteroneLabelOpacity }}
              >
                テストステロン
              </div>
            )}
            {boneLabelOpacity > 0 && (
              <div style={{ ...styles.organLabel, left: `${((bonePos.x + 26) / 200) * 100}%`, top: `${(bonePos.y / 280) * 100}%`, opacity: boneLabelOpacity }}>
                {hiOrganLabelJa.bone}
              </div>
            )}

            {/* Ovary dual-tone (Gap 3, fixed) — a second SVG layer, rendered after the ovary's NodeAt div so it actually paints on top instead of underneath it. */}
            {ovaryDualToneOpacity > 0 && (
              <svg viewBox={BODY_VIEWBOX} style={styles.overlaySvg} aria-hidden="true">
                <circle cx={ovaryPos.x - 4} cy={ovaryPos.y - 4} r={11} fill={hiOrganColor.hypothalamus} opacity={ovaryDualToneOpacity} style={{ filter: "blur(3px)" }} />
              </svg>
            )}
          </BodySilhouette>
        </div>

        {gaugeOpacity > 0 && (
          <div style={{ ...styles.gaugeWrap, opacity: gaugeOpacity * (1 - totalFootageOpacity) }}>
            <Gauge progress={gaugeProgress} currentLabel="16.9x" targetLabel="200x" trackEmphasis={gaugeTrackEmphasis} />
          </div>
        )}

        {PROGESTERONE_FOOTAGE.map((shot, i) => (
          <FootageSlot key={shot.id} shot={shot} opacity={footageOpacities[i]} />
        ))}

        {activeSubtitle && (
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
          {playState === "playing" ? `Playing… ${elapsed.toFixed(1)}s / ${SCENE_DURATION_S}s` : playState === "done" ? "Replay Progesterone" : "Play Progesterone"}
        </button>
      </div>
    </div>
  );
}

function NodeAt({
  pos,
  organ,
  style,
}: {
  pos: { x: number; y: number };
  organ: "ovaries" | "bone" | "brain";
  style?: CSSProperties;
}) {
  const size = 44;
  return (
    <div style={{ position: "absolute", left: `${(pos.x / 200) * 100}%`, top: `${(pos.y / 280) * 100}%`, width: size, transform: "translate(-50%, -50%)", ...style }}>
      <OrganNode organ={organ} state="healthy" />
    </div>
  );
}

// Estrogen/testosterone are hormones, not organs — no OrganNode shape
// exists (or should exist) for them. Rendered as a small gold endpoint
// instead, consistent with how a branch terminus reads elsewhere in the
// Hormone Intelligence visual language without inventing a body-part icon
// for something that isn't one.
function HormoneEndpoint({ pos, opacity = 1 }: { pos: { x: number; y: number }; opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${(pos.x / 200) * 100}%`,
        top: `${(pos.y / 280) * 100}%`,
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: hiOrganColor.adrenal,
        opacity,
        transform: "translate(-50%, -50%)",
        transition: "opacity 300ms linear",
      }}
    />
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
    fontSize: 12,
    color: hiColor.ink,
    transition: "opacity 300ms ease-in-out",
    whiteSpace: "nowrap",
  },
  gaugeWrap: {
    position: "absolute",
    left: "15%",
    right: "15%",
    top: "40%",
    transition: "opacity 400ms ease-in-out",
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
