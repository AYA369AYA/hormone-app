import type { CSSProperties } from "react";
import type { Source } from "@/lib/source";
import { EmailSignupForm } from "./EmailSignupForm";

export function EmailNurtureCta({ source }: { source: Source }) {
  return (
    <div style={styles.wrapper}>
      <p style={styles.heading}>まだ検査に進むタイミングではない方へ</p>
      <p style={styles.body}>
        Hormone Intelligenceについて、メールで少しずつ学んでいただくこともできます。
        <br />
        ご自身のペースで、身体の現在地を知る準備を整えてください。
      </p>
      <EmailSignupForm
        source={source}
        label="Hormone Intelligenceをメールで学ぶ"
      />
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 32,
    padding: 20,
    borderRadius: 18,
    background: "#F5EFE6",
  },
  heading: {
    fontSize: 15,
    color: "#2C2A28",
    marginBottom: 10,
    fontWeight: 600,
  },
  body: {
    fontSize: 13,
    lineHeight: 1.8,
    color: "#5A534D",
  },
};
