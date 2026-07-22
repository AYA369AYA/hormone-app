"use client";

import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import { hiColor, hiMotion, type HiOrgan } from "./tokens";
import { OrganNode, usePrefersReducedMotion, type OrganVitality } from "./OrganNode";

/**
 * SignalPath — A2.
 *
 * Renders a set of OrganNode instances as one connected, communicating
 * network: static "connection" lines exist first, always, regardless of
 * whether a signal is currently travelling — per your "connection before
 * movement" principle. When active, exactly one signal travels exactly one
 * edge at a time, arriving at its destination node and triggering that
 * node's own pulse — never two things animating across the network at
 * once. Sequencing is driven by a small JS interval that tracks *which
 * single edge is currently live*; the actual travel motion is fully
 * CSS/compositor-driven (`offset-path`), so the interval is only ever
 * flipping a "whose turn is it" index, not animating anything itself.
 *
 * See hormone_intelligence_art_direction_guide_v1.md §5 (network-
 * visualization device) and cg_storyboard_v1.md, Scenes 02/04/07/09/12.
 */

export interface SignalPathNode {
  /** Unique id for this node within the pathway — referenced by edges and sequence. */
  id: string;
  organ: HiOrgan;
  /** Position in the shared viewBox coordinate space. */
  x: number;
  y: number;
  /** Defaults to "healthy". */
  vitality?: OrganVitality;
  /** Rendered size of this node, in viewBox units. Defaults to 40. */
  size?: number;
}

export interface SignalPathEdge {
  from: string;
  to: string;
}

export interface SignalPathProps {
  nodes: SignalPathNode[];
  edges: SignalPathEdge[];
  /**
   * Ordered node ids defining the pulse sequence — e.g.
   * ["brain", "adrenal", "liver", "ovaries"]. Consecutive pairs must exist
   * as an edge. Defaults to `nodes` in the order given if omitted.
   */
  sequence?: string[];
  /**
   * Whether the sequence is currently running. false = fully connected and
   * calm, but idle — no signal traffic. This is a real, intentional resting
   * state, not just "off": every node still breathes, every connection
   * still shows. Defaults to true.
   */
  active?: boolean;
  /** Loop the sequence continuously. Defaults to true. */
  loop?: boolean;
  viewBox?: string;
  /** Rendered size in px. Omit to fill 100% of the parent container. */
  size?: number;
  disableAnimation?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Exported for reuse by scenes that need a single scripted signal (not A2's looping sequencer) but should still use the exact same curve construction — e.g. Scene02. Non-behavioral change to A2. */
export function curvedPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  // A gentle perpendicular bow, not a straight technical line — keeps the
  // network feeling organic rather than like a circuit diagram.
  const offset = len * 0.12;
  const cx = mx + (-dy / len) * offset;
  const cy = my + (dx / len) * offset;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function SignalPath({
  nodes,
  edges,
  sequence,
  active = true,
  loop = true,
  viewBox = "0 0 200 200",
  size,
  disableAnimation = false,
  className,
  style,
}: SignalPathProps) {
  const uid = useId();
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationsOff = disableAnimation || prefersReducedMotion;

  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const resolvedSequence = useMemo(() => sequence ?? nodes.map((n) => n.id), [sequence, nodes]);

  // The static connection layer renders every declared edge — this is the
  // network's actual topology (which may be a hub, a mesh, or a chain),
  // independent of which subset of it the sequence happens to visit.
  const renderedEdges = useMemo(() => {
    return edges
      .map((e) => {
        const from = nodeById.get(e.from);
        const to = nodeById.get(e.to);
        if (!from || !to) return null;
        return { from, to, d: curvedPath(from.x, from.y, to.x, to.y) };
      })
      .filter((e): e is { from: SignalPathNode; to: SignalPathNode; d: string } => e !== null);
  }, [edges, nodeById]);

  // The travelling signal only ever moves along a *declared* edge — each
  // consecutive pair in the sequence is looked up against `edges` (in
  // either direction) rather than assumed to be directly connected, so a
  // sequence can't silently draw a connection that isn't part of the
  // network's real topology.
  const sequenceEdges = useMemo(() => {
    const pairs: { from: SignalPathNode; to: SignalPathNode; d: string }[] = [];
    for (let i = 0; i < resolvedSequence.length - 1; i++) {
      const fromId = resolvedSequence[i];
      const toId = resolvedSequence[i + 1];
      const declared = edges.find((e) => (e.from === fromId && e.to === toId) || (e.from === toId && e.to === fromId));
      const from = nodeById.get(fromId);
      const to = nodeById.get(toId);
      if (!declared || !from || !to) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`SignalPath: sequence step "${fromId}" → "${toId}" has no matching edge in \`edges\` — skipping this step.`);
        }
        continue;
      }
      pairs.push({ from, to, d: curvedPath(from.x, from.y, to.x, to.y) });
    }
    return pairs;
  }, [resolvedSequence, edges, nodeById]);

  const [activeEdgeIndex, setActiveEdgeIndex] = useState(0);
  const [pulsingNodeId, setPulsingNodeId] = useState<string | null>(null);

  const running = active && !animationsOff && sequenceEdges.length > 0;

  useEffect(() => {
    if (!running) return;

    let step = 0;
    // The node whose turn it is right now always pulses first — this
    // covers the sequence's very first node, which never receives a
    // signal from elsewhere but should still visibly "begin" the pathway.
    setPulsingNodeId(resolvedSequence[0]);
    setActiveEdgeIndex(0);

    const interval = window.setInterval(() => {
      step += 1;
      if (step >= sequenceEdges.length) {
        if (!loop) {
          window.clearInterval(interval);
          return;
        }
        step = 0;
      }
      setActiveEdgeIndex(step);
      // The destination of the edge that just started travelling is the
      // node that will pulse once it arrives — timed to the *next* tick,
      // which lands exactly one hiMotion.pulseDurationMs later, matching
      // the travel animation's own duration.
      window.setTimeout(() => {
        setPulsingNodeId(sequenceEdges[step]?.to.id ?? null);
      }, hiMotion.pulseDurationMs);
    }, hiMotion.pulseDurationMs);

    return () => window.clearInterval(interval);
    // sequenceEdges/resolvedSequence intentionally omitted from deps: a
    // pathway's structure is expected to be stable for the component's
    // lifetime, and restarting the interval on every derived-array
    // recalculation would fight the sequencing rather than serve it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, loop]);

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label="ホルモン・インテリジェンス ネットワーク図"
      className={className}
      style={{
        width: size ?? "100%",
        height: size ?? "auto",
        display: "block",
        overflow: "visible",
        ...style,
      }}
    >
      {/* Connection layer — always rendered, regardless of `active`. This is
          the literal implementation of "connection before movement": the
          network's structure is visible whether or not anything is
          currently signalling. */}
      <g aria-hidden="true">
        {renderedEdges.map((edge) => (
          <path key={`${edge.from.id}-${edge.to.id}`} d={edge.d} fill="none" stroke={hiColor.gold} strokeOpacity={0.28} strokeWidth={1.2} />
        ))}
      </g>

      {/* Travelling signal — exactly one at a time. */}
      {running && sequenceEdges[activeEdgeIndex] && (
        <circle
          key={`${uid}-${activeEdgeIndex}`}
          r={3}
          fill={hiColor.gold}
          style={{
            offsetPath: `path("${sequenceEdges[activeEdgeIndex].d}")`,
            offsetRotate: "0deg",
            animation: `hi-signal-travel-kf ${hiMotion.pulseDurationMs}ms linear`,
          }}
        />
      )}

      {/* Organ nodes. */}
      {nodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x - (node.size ?? 40) / 2}, ${node.y - (node.size ?? 40) / 2})`}>
          <foreignObject width={node.size ?? 40} height={node.size ?? 40} style={{ overflow: "visible" }}>
            <OrganNode
              organ={node.organ}
              state={node.vitality ?? "healthy"}
              pulse={running && pulsingNodeId === node.id}
              breatheDelayMs={hashDelay(node.id)}
              disableAnimation={animationsOff}
            />
          </foreignObject>
        </g>
      ))}
    </svg>
  );
}

/** Small deterministic hash so nodes with different ids naturally breathe out of phase, without needing the caller to hand-pick delays. */
function hashDelay(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) % 1000;
  }
  return h;
}
