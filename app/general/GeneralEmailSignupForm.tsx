"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "../components/AnalyticsEvent";
import type { Source } from "@/lib/source";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sansJp =
  '"Hiragino Kaku Gothic Pro", "Hiragino Sans", "Yu Gothic", sans-serif';

/** /general専用の、ラグジュアリー仕様のメール登録フォーム。ロジックは元と同一。 */
export function GeneralEmailSignupForm({
  source,
  redirectTo,
  label,
  placeholder,
  buttonLabel,
  successMessage,
}: {
  source: Source;
  redirectTo?: string;
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      trackEvent("email_registration", { source });

      if (redirectTo) {
        router.push(redirectTo);
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p style={styles.success}>
        {successMessage ??
          "ご登録ありがとうございます。Hormone Intelligenceを学べるメールを、これから順にお届けします。"}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label} htmlFor="email">
        {label ?? "結果の詳しい解説を、メールで受け取りませんか？"}
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder ?? "you@example.com"}
        style={styles.input}
      />
      <button type="submit" disabled={status === "submitting"} style={styles.button}>
        {status === "submitting" ? "送信中..." : (buttonLabel ?? "解説を受け取る")}
      </button>
      {status === "error" && (
        <p style={styles.error}>
          登録に失敗しました。メールアドレスをご確認のうえ、もう一度お試しください。
        </p>
      )}
    </form>
  );
}

const styles: Record<string, CSSProperties> = {
  form: { marginTop: 28 },
  label: {
    display: "block",
    marginBottom: 14,
    fontFamily: sansJp,
    fontWeight: 300,
    lineHeight: 1.8,
    letterSpacing: "0.02em",
    color: "#5A534D",
  },
  input: {
    width: "100%",
    padding: "12px 4px",
    border: "none",
    borderBottom: "1px solid rgba(198,169,107,0.4)",
    borderRadius: 0,
    marginBottom: 20,
    boxSizing: "border-box",
    background: "transparent",
    fontSize: 15,
    fontFamily: sansJp,
    color: "#2f2923",
  },
  button: {
    display: "block",
    width: "100%",
    padding: 16,
    borderRadius: 999,
    border: "1px solid #C6A96B",
    background: "linear-gradient(165deg, #D3B87E 0%, #C6A96B 100%)",
    color: "#fff",
    fontSize: 14,
    fontFamily: sansJp,
    fontWeight: 500,
    letterSpacing: "0.06em",
    cursor: "pointer",
    boxShadow: "0 10px 24px -14px rgba(198,169,107,0.7)",
  },
  error: { marginTop: 10, fontFamily: sansJp, fontSize: 13, color: "#B3453B" },
  success: {
    marginTop: 24,
    fontFamily: sansJp,
    fontWeight: 300,
    lineHeight: 1.9,
    color: "#5A534D",
    whiteSpace: "pre-line",
  },
};
