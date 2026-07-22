"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { hiColor, hiMotion, hiOrganLabelEn, hiOrganLabelJa, type HiOrgan } from "./tokens";
import { OrganNode, usePrefersReducedMotion, type OrganVitality } from "./OrganNode";

/**
 * MechanismDiagram — Visual Language v2.
 *
 * "Diagram mode" from Art Direction Guide §5: a fixed, labeled, vertical
 * flowchart for explaining a step-by-step hormone cascade (the HPA axis,
 * a conversion pathway) — as opposed to A2 SignalPath's "network mode"
 * (free node positioning, organic curves), which is still the right tool
 * for whole-body/systemic moments. Both share the same underlying rule —
 * signal travels in sequence, never simultaneously.
 *
 * Every node is a real, unmodified A1 OrganNode — this component only
 * owns layout, labels, arrows, and sequencing.
 */

export interface MechanismStep {
  organ: HiOrgan;
  /** Vitality at this point in the diagram. Defaults to "healthy". */
  vitality?: OrganVitality;
}

export interface MechanismDiagramProps {
  steps: MechanismStep[];
  /** Whether the sequence is actively running. false = fully labeled and connected, but idle. Defaults to true. */
  active?: boolean;
  loop?: boolean;
  size?: number;
  disableAnimation?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function MechanismDiagram({
  steps,
  active = true,
  loop = true,
  size,
  disableAnimation = false,
  className,
  style,
}: MechanismDiagramProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationsOff = disableAnimation || prefersReducedMotion;
  const [pulsingIndex, setPulsingIndex] = useState(0);

  const running = active && !animationsOff && steps.length > 1;

  // The sequencing timer — a genuine external clock subscription, the
  // same pattern already used in A2 SignalPath. Reduced-motion/static
  // scenes never enter this branch, so the diagram is always readable at
  // a glance from labels/layout alone, per Visual Language v2's
  // "understand with audio muted" principle.
  useEffect(() => {
    if (!running) return;
    // No explicit reset to step 0 here: pulsingIndex already starts at 0
    // via useState, and in practice this effect only transitions
    // false→true once per scene (when playback starts), so the default
    // is already correct. The interval's own ticks own every update from
    // here on — see A1/A2 for the same "let the effect only subscribe,
    // never synchronously setState" discipline.
    let step = 0;
    const interval = window.setInterval(() => {
      step += 1;
      if (step >= steps.length) {
        if (!loop) {
          window.clearInterval(interval);
          return;
        }
        step = 0;
      }
      setPulsingIndex(step);
    }, hiMotion.pulseDurationMs);
    return () => window.clearInterval(interval);
  }, [running, loop, steps.length]);

  const effectivePulsingIndex = animationsOff ? -1 : pulsingIndex;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: size ?? "100%",
        ...style,
      }}
    >
      {steps.map((step, i) => (
        <div key={`${step.organ}-${i}`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 68, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <OrganNode
                organ={step.organ}
                state={step.vitality ?? "healthy"}
                pulse={running && effectivePulsingIndex === i}
                disableAnimation={animationsOff}
              />
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: hiColor.ink }}>{hiOrganLabelJa[step.organ]}</span>
            <span style={{ fontSize: 10, color: hiColor.inkMuted }}>{hiOrganLabelEn[step.organ]}</span>
          </div>
          {i < steps.length - 1 && (
            <FlowArrow active={running && (effectivePulsingIndex === i || effectivePulsingIndex === i + 1)} />
          )}
        </div>
      ))}
    </div>
  );
}

function FlowArrow({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 14 22" width={14} height={22} style={{ margin: "2px 0" }} aria-hidden="true">
      <line x1="7" y1="0" x2="7" y2="16" stroke={hiColor.ink} strokeOpacity={0.15} strokeWidth={1.5} />
      <path d="M3 13 L7 19 L11 13" fill="none" stroke={hiColor.ink} strokeOpacity={0.15} strokeWidth={1.5} />
      <circle cx="7" cy="8" r="2.5" fill={hiColor.gold} opacity={active ? 0.85 : 0.25} style={{ transition: "opacity 400ms ease-in-out" }} />
    </svg>
  );
}
