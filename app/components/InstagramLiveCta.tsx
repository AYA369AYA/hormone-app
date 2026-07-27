import type { CSSProperties } from "react";
import { INSTAGRAM_LIVES, INSTAGRAM_LIVE_LIST_URL } from "@/lib/instagram";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="none" stroke="currentColor" strokeWidth={1.6} />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function InstagramLiveCta({ topic }: { topic?: string }) {
  const entry = topic ? INSTAGRAM_LIVES[topic] : undefined;
  const hasTopicLink = Boolean(entry?.url);

  if (!hasTopicLink && !INSTAGRAM_LIVE_LIST_URL) {
    return null;
  }

  return (
    <div style={styles.wrapper}>
      {hasTopicLink && entry && (
        <>
          <p style={styles.text}>
            このテーマについて、AYA Women&apos;s ClinicのInstagram Liveでも詳しくお話ししています。
          </p>
          <a href={entry.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
            <InstagramIcon />
            「{entry.title}」を見る
          </a>
        </>
      )}

      {INSTAGRAM_LIVE_LIST_URL && (
        <a
          href={INSTAGRAM_LIVE_LIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={hasTopicLink ? styles.listLink : styles.link}
        >
          <InstagramIcon />
          Instagram Live一覧を見る
        </a>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 10,
    padding: "10px 12px",
    borderRadius: 10,
    background: "#FCFAF7",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.7,
    color: "#A08F7E",
    marginBottom: 6,
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: "#8A7857",
    textDecoration: "underline",
  },
  listLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: "#A08F7E",
    textDecoration: "underline",
    marginTop: 8,
  },
};
