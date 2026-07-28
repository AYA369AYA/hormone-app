"use client";

import type { CSSProperties } from "react";
import { hiColor } from "./tokens";
import type { FootageShot } from "../../../lib/footageShot";

/**
 * FootageSlot — renders one live-action shot from any scene's footage
 * config (lib/scene02Footage.ts, lib/progesteroneFootage.ts, etc. — see
 * lib/footageShot.ts for the shared shape). Renders the real clip
 * (`videoSrc`) or still (`imageSrc`) when set — video takes priority if
 * both are present; otherwise renders a clearly-labeled placeholder so
 * scaffolding is never mistaken for final creative during review. This
 * component never needs to change to receive real assets, or to support a
 * new scene — only each scene's config file does.
 */
export function FootageSlot({ shot, opacity }: { shot: FootageShot; opacity: number }) {
  if (opacity <= 0) return null;

  return (
    <div style={{ ...styles.wrap, opacity }} aria-hidden="true">
      {shot.videoSrc ? (
        <video src={shot.videoSrc} poster={shot.posterSrc} muted playsInline style={styles.media} />
      ) : shot.imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- stand-in imagery is swapped via config, not part of the app's build-time image set
        <img src={shot.imageSrc} alt="" style={styles.media} />
      ) : (
        <div style={styles.placeholder}>
          <p style={styles.placeholderTag}>TEMPORARY — pending footage</p>
          <p style={styles.placeholderLabel}>{shot.label}</p>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrap: {
    position: "absolute",
    inset: 0,
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "16%",
    // Deliberately distinct from hiColor.canvas so a placeholder never
    // reads as "the finished frame" at a glance.
    background: "#EFE9DF",
    border: `1px dashed ${hiColor.inkMuted}`,
    boxSizing: "border-box",
  },
  placeholderTag: {
    margin: 0,
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: hiColor.inkMuted,
  },
  placeholderLabel: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    fontSize: 13,
    lineHeight: 1.6,
    textAlign: "center",
    color: hiColor.inkSoft,
  },
};
