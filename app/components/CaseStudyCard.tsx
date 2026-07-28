"use client";

import { useState, type CSSProperties } from "react";
import type { CaseStudy } from "@/lib/caseStudies";
import { InstagramLiveCta } from "./InstagramLiveCta";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);

  if (study.status === "coming-soon") {
    return (
      <div style={styles.comingSoonCard}>
        <p style={styles.comingSoonLabel}>近日公開</p>
        <p style={styles.comingSoonTitle}>{study.title}</p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      {study.videoSrc ? (
        <video
          style={styles.media}
          src={study.videoSrc}
          poster={study.posterSrc}
          controls
          preload="none"
          playsInline
        >
          {study.captionsSrc && (
            <track kind="captions" src={study.captionsSrc} srcLang="ja" default />
          )}
        </video>
      ) : study.photoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={study.photoSrc} alt={study.title} style={styles.media} />
      ) : (
        <div style={styles.mediaPlaceholder}>動画準備中</div>
      )}
      <div style={styles.instagramSlot}>
        <InstagramLiveCta topic={study.instagramTopicId} />
      </div>

      <div style={styles.content}>
        <p style={styles.tag}>{study.tag}</p>
        <h3 style={styles.title}>{study.title}</h3>
        <p style={styles.summary}>{study.summary}</p>

        {study.readMoreHref ? (
          <a href={study.readMoreHref} style={styles.readMore}>
            続きを読む
          </a>
        ) : (
          study.body && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              style={styles.readMore}
            >
              {expanded ? "閉じる" : "続きを読む"}
            </button>
          )
        )}

        {expanded && study.body && (
          <div style={styles.expanded}>
            {study.body.map((paragraph, i) => (
              <p key={i} style={styles.paragraph}>
                {paragraph}
              </p>
            ))}
            {study.quote && <p style={styles.quote}>「{study.quote}」</p>}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  card: {
    flex: "0 0 72%",
    scrollSnapAlign: "start",
    borderRadius: 20,
    overflow: "hidden",
    background: "#fff",
    border: "1px solid rgba(198,169,107,0.2)",
  },
  media: {
    display: "block",
    width: "100%",
    aspectRatio: "9 / 16",
    objectFit: "cover",
    background: "#000",
  },
  mediaPlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: "9 / 16",
    background: "#F5EFE6",
    color: "#A08F7E",
  },
  instagramSlot: {
    padding: "0 16px",
  },
  content: {
    padding: 20,
  },
  tag: {
    fontSize: 11,
    letterSpacing: "0.1em",
    color: "#A08F7E",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 17,
    lineHeight: 1.6,
    color: "#2C2A28",
    marginBottom: 10,
  },
  summary: {
    lineHeight: 1.8,
    color: "#5A534D",
    marginBottom: 14,
  },
  readMore: {
    display: "inline-block",
    background: "none",
    border: "none",
    padding: 0,
    fontSize: 13,
    color: "#8A7857",
    textDecoration: "underline",
    cursor: "pointer",
  },
  expanded: {
    marginTop: 16,
  },
  paragraph: {
    lineHeight: 1.9,
    color: "#5A534D",
    marginBottom: 12,
  },
  quote: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    background: "#F5EFE6",
    lineHeight: 1.8,
    color: "#2C2A28",
    fontStyle: "italic",
  },
  comingSoonCard: {
    flex: "0 0 40%",
    scrollSnapAlign: "start",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 160,
    borderRadius: 20,
    background: "#FCFAF7",
    border: "1px dashed rgba(198,169,107,0.35)",
    color: "#A08F7E",
    textAlign: "center",
  },
  comingSoonLabel: {
    fontSize: 11,
    letterSpacing: "0.1em",
    marginBottom: 8,
  },
  comingSoonTitle: {
    fontSize: 14,
  },
};
