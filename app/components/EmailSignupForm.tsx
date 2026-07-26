"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "./AnalyticsEvent";
import type { Source } from "@/lib/source";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailSignupForm({
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
  form: { marginTop: 24 },
  label: { display: "block", marginBottom: 8, lineHeight: 1.7, color: "#5A534D" },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "1px solid rgba(198,169,107,0.4)",
    marginBottom: 12,
    boxSizing: "border-box",
    fontSize: 16,
  },
  button: {
    display: "block",
    width: "100%",
    padding: 16,
    borderRadius: 999,
    border: "1px solid #C6A96B",
    background: "#C6A96B",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },
  error: { marginTop: 10, color: "#B3453B" },
  success: { marginTop: 24, lineHeight: 1.8, color: "#5A534D", whiteSpace: "pre-line" },
};
