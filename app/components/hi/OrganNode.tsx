"use client";

import { useId, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { hiLuminosity, hiMotion, hiOrganColor, hiOrganLabelJa, type HiOrgan } from "./tokens";

/**
 * OrganNode — A1.
 *
 * The fundamental visual unit of Hormone Intelligence: a single organ,
 * rendered as elegant, minimal line-art, expressing its current vitality
 * through light (opacity / saturation / glow) rather than colour, hue, or
 * any warning tone. Never flashes on its own — ambient breathing is the
 * only animation that runs without external input; the signal pulse is
 * always driven by a caller (in production, the Signal Path / A2
 * orchestrator), so multiple nodes on screen read as one communicating
 * system rather than independent icons.
 *
 * Animation is layered across three nested groups so nothing fights over
 * a single `animation`/`transform` property:
 *   1. Breathe wrapper — continuous, ambient, always on (unless disabled)
 *   2. Signal wrapper — one-shot pulse, only when `pulse` fires, remounted
 *      via a key so the CSS animation reliably restarts every time
 *   3. Glow + shape layers — express the current vitality state
 *
 * See hormone_intelligence_art_direction_guide_v1.md §3 and §5, and
 * cg_storyboard_v1.md for the network-visualization device this component
 * implements.
 */

export type OrganVitality = "depleted" | "recovering" | "healthy";

export interface OrganNodeProps {
  /** Which organ to render. Both shape and colour are fixed by this — never independently overridable, per the Art Direction Guide's permanent organ-colour system. */
  organ: HiOrgan;
  /** Current vitality state. Defaults to "healthy". */
  state?: OrganVitality;
  /**
   * External signal-pulse trigger. Toggle true (e.g. from A2's sequencing
   * orchestrator) to play one brief "receiving a signal" pulse. This is the
   * *only* way a pulse fires — the component never starts one on its own
   * timer, so multiple nodes never flash independently.
   */
  pulse?: boolean;
  /** Delay in ms before the ambient breathing loop starts, so multiple nodes on screen breathe slightly out of phase rather than in lockstep. Defaults to 0. */
  breatheDelayMs?: number;
  /** Rendered size in px. Omit to fill 100% of the parent container's width (default, recommended — this is what makes the component scale cleanly from mobile to presentation displays). */
  size?: number;
  /** Accessible label override, for localization (see Production Bible §8, international edition). Defaults to the organ's Japanese name from tokens.ts. */
  label?: string;
  /** Render a small text label beneath the shape (matching the existing WholeBodyCg convention). Off by default. */
  showLabel?: boolean;
  /** Disable all animation regardless of user/OS motion preference — for storyboard stills, static thumbnails, and print/export contexts. `prefers-reduced-motion: reduce` is also respected automatically via CSS (see globals.css); this prop is for explicit programmatic control on top of that. */
  disableAnimation?: boolean;
  className?: string;
  style?: CSSProperties;
}

const VIEW_BOX = "0 0 160 120";

/**
 * Tracks the OS/browser `prefers-reduced-motion` setting, live.
 * Uses useSyncExternalStore rather than a useState+useEffect pair — this
 * is genuinely external mutable state (the OS setting), which is exactly
 * what useSyncExternalStore exists for, and it avoids the render-then-
 * immediately-setState-in-an-effect pattern that a plain effect would need.
 */
function subscribeToReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  // No OS preference available during SSR — assume motion is allowed
  // until the client hydrates and reports the real value.
  return false;
}

/** Exported for reuse by other Hormone Intelligence components (e.g. A2 SignalPath) that need the same reduced-motion check without duplicating this logic. Non-behavioral change to A1 — no change to OrganNode's own rendering or public props. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

function OrganShape({ organ }: { organ: HiOrgan }): ReactNode {
  switch (organ) {
    case "brain":
      return (
        <path
          d="M30 45 C22 20 55 8 80 12 C105 8 138 20 130 45 C138 65 118 88 90 86 C86 96 70 96 66 86 C40 88 22 65 30 45 Z"
          fill={hiOrganColor.brain}
        />
      );
    case "liver":
      return (
        <path
          d="M25 55 C25 30 55 22 85 26 C115 30 135 42 132 62 C129 84 100 96 70 92 C42 88 25 78 25 55 Z"
          fill={hiOrganColor.liver}
        />
      );
    case "adrenal":
      return (
        <path
          d="M80 35 C65 35 58 50 60 65 C62 80 70 88 80 88 C90 88 98 80 100 65 C102 50 95 35 80 35 Z"
          fill={hiOrganColor.adrenal}
        />
      );
    case "ovaries":
      return (
        <g fill={hiOrganColor.ovaries}>
          <path d="M62 60 L98 60" stroke={hiOrganColor.ovaries} strokeWidth={2} />
          <ellipse cx="55" cy="60" rx="17" ry="25" />
          <ellipse cx="105" cy="60" rx="17" ry="25" />
        </g>
      );
    case "gut":
      return (
        <path
          d="M20 65 C35 40 50 90 65 65 C80 40 95 90 110 65 C118 52 130 52 138 60"
          fill="none"
          stroke={hiOrganColor.gut}
          strokeWidth={6}
          strokeLinecap="round"
        />
      );
    case "bone":
      return (
        <g fill={hiOrganColor.bone}>
          <rect x="45" y="52" width="70" height="16" rx="8" />
          <circle cx="42" cy="60" r="16" />
          <circle cx="118" cy="60" r="16" />
        </g>
      );
    case "hypothalamus":
      // Visual Language v2: small, simple, deliberately subordinate to
      // brain's shape (it's a structure within/below the brain) — a soft
      // ellipse, not a full organ silhouette of its own.
      return <ellipse cx="80" cy="60" rx="26" ry="20" fill={hiOrganColor.hypothalamus} />;
    case "pituitary":
      // Smaller still than hypothalamus, consistent with its real relative
      // size and its position later in the HPA cascade.
      return <ellipse cx="80" cy="60" rx="19" ry="16" fill={hiOrganColor.pituitary} />;
    default:
      return null;
  }
}

export function OrganNode({
  organ,
  state = "healthy",
  pulse = false,
  breatheDelayMs = 0,
  size,
  label,
  showLabel = false,
  disableAnimation = false,
  className,
  style,
}: OrganNodeProps) {
  const filterId = useId();
  const [pulseKey, setPulseKey] = useState(0);
  const [prevPulse, setPrevPulse] = useState(pulse);
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationsOff = disableAnimation || prefersReducedMotion;

  // Replay the signal-pulse animation whenever `pulse` transitions to true.
  // This adjusts state during render (a documented React pattern for
  // "state derived from a prop change") rather than in a useEffect, so
  // there's no extra commit-then-immediately-rerender cycle for something
  // that's really just "this render's key should differ from last render's."
  if (pulse !== prevPulse) {
    setPrevPulse(pulse);
    if (pulse) {
      setPulseKey((k) => k + 1);
    }
  }

  const endpoint = hiLuminosity[state === "depleted" ? "dim" : "full"];
  const isRecovering = state === "recovering";
  const isDepleted = state === "depleted";

  const breatheStyle: CSSProperties = animationsOff
    ? {}
    : {
        transformBox: "fill-box",
        transformOrigin: "center",
        animation: `hi-breathe-kf ${hiMotion.pulseDurationMs}ms ease-in-out ${breatheDelayMs}ms infinite`,
        // Depleted organs still breathe — just quietly. The system should
        // never read as "off," only as "needing support."
        ["--hi-breathe-scale" as string]: isDepleted ? "1.006" : "1.02",
      };

  const signalStyle: CSSProperties | undefined =
    !animationsOff && pulse
      ? {
          transformBox: "fill-box",
          transformOrigin: "center",
          animation: `hi-signal-pulse-kf ${hiMotion.glowTransitionMs}ms ease-out`,
        }
      : undefined;

  // When animation is off, "recovering" has no in-between motion to show —
  // fall back to the fully-recovered (healthy) endpoint rather than leaving
  // opacity/filter unset, which would default to a bare, unstyled 1/none.
  const recoveringStatic = hiLuminosity.full;

  const glowStyle: CSSProperties = {
    opacity: isRecovering ? (animationsOff ? recoveringStatic.glow : undefined) : endpoint.glow,
    transition: animationsOff ? "none" : `opacity ${hiMotion.glowTransitionMs}ms ease-in-out`,
    animation:
      isRecovering && !animationsOff
        ? `hi-recover-glow-kf ${hiMotion.glowTransitionMs * 1.6}ms ease-out forwards`
        : undefined,
  };

  const shapeStyle: CSSProperties = {
    opacity: isRecovering ? (animationsOff ? recoveringStatic.opacity : undefined) : endpoint.opacity,
    filter: isRecovering
      ? animationsOff
        ? `saturate(${recoveringStatic.saturation})`
        : undefined
      : `saturate(${endpoint.saturation})`,
    transition: animationsOff
      ? "none"
      : `opacity ${hiMotion.glowTransitionMs}ms ease-in-out, filter ${hiMotion.glowTransitionMs}ms ease-in-out`,
    animation:
      isRecovering && !animationsOff
        ? `hi-recover-kf ${hiMotion.glowTransitionMs * 1.6}ms ease-out forwards`
        : undefined,
  };

  return (
    <svg
      viewBox={VIEW_BOX}
      role="img"
      aria-label={label ?? hiOrganLabelJa[organ]}
      className={className}
      style={{
        width: size ?? "100%",
        height: size ?? "auto",
        display: "block",
        overflow: "visible",
        ...style,
      }}
    >
      <defs>
        <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      <g style={breatheStyle}>
        <g key={pulseKey} style={signalStyle}>
          <g filter={`url(#${filterId})`} style={glowStyle}>
            <OrganShape organ={organ} />
          </g>
          <g style={shapeStyle}>
            <OrganShape organ={organ} />
          </g>
        </g>
      </g>

      {showLabel && (
        <text x="80" y="112" textAnchor="middle" fontSize="10" fill="#5A534D">
          {label ?? hiOrganLabelJa[organ]}
        </text>
      )}
    </svg>
  );
}
