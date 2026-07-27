"use client";

import type { CSSProperties } from "react";
import { trackEvent } from "./AnalyticsEvent";
import { InstagramLiveCta } from "./InstagramLiveCta";
import type { Source } from "@/lib/source";

export function TestimonialVideo({
  id,
  heading,
  lead,
  src,
  poster,
  source,
  instagramTopic,
}: {
  id: string;
  heading: string;
  lead: string;
  src: string;
  poster: string;
  source: Source;
  instagramTopic?: string;
}) {
  function handlePlay() {
    trackEvent("journey_testimonial_play", { source, video: id });
  }

  return (
    <section style={styles.section}>
      <p style={styles.lead}>{lead}</p>
      <h2 style={styles.heading}>{heading}</h2>
      <div style={styles.videoWrapper}>
        <video
          style={styles.video}
          src={src}
          poster={poster}
          controls
          preload="none"
          playsInline
          onPlay={handlePlay}
        />
      </div>
      <InstagramLiveCta topic={instagramTopic} />
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 40,
  },
  lead: {
    fontSize: 14,
    lineHeight: 1.8,
    color: "#5A534D",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    lineHeight: 1.6,
    color: "#2C2A28",
    marginBottom: 16,
  },
  videoWrapper: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    background: "#000",
  },
  video: {
    display: "block",
    width: "100%",
    height: "auto",
  },
};
