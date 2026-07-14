import { toKitSourceLabel, type Source } from "./source";

const KIT_API_BASE_URL = "https://api.kit.com/v4";

interface SubscribeToKitParams {
  email: string;
  source: Source;
}

interface SubscribeToKitResult {
  ok: boolean;
  error?: string;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function kitRequest(path: string, apiKey: string, body: Record<string, unknown>) {
  const res = await fetch(`${KIT_API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Kit API request failed (${res.status}): ${text}`);
  }

  return res.json();
}

/**
 * Kitへ購読者を登録する。カスタムフィールドの設定は /v4/forms/{id}/subscribers では
 * 反映されないため、/v4/subscribers (upsert) で流入元を保存してからフォーム・タグに紐付ける。
 * KIT_API_KEY等が未設定/リクエスト失敗の場合も例外を投げず {ok:false} を返す。
 */
export async function subscribeToKit({
  email,
  source,
}: SubscribeToKitParams): Promise<SubscribeToKitResult> {
  try {
    const apiKey = getRequiredEnv("KIT_API_KEY");
    const formId = getRequiredEnv("KIT_FORM_ID");
    const tagId = getRequiredEnv("KIT_TAG_ID_HORMONE_INTELLIGENCE");
    const sourceFieldKey = getRequiredEnv("KIT_SOURCE_FIELD_KEY");

    await kitRequest(`/subscribers`, apiKey, {
      email_address: email,
      fields: {
        [sourceFieldKey]: toKitSourceLabel(source),
      },
    });

    await kitRequest(`/forms/${formId}/subscribers`, apiKey, {
      email_address: email,
    });

    await kitRequest(`/tags/${tagId}/subscribers`, apiKey, {
      email_address: email,
    });

    return { ok: true };
  } catch (error) {
    console.error("[kit] subscribeToKit failed", error);
    return { ok: false, error: "kit_subscribe_failed" };
  }
}
