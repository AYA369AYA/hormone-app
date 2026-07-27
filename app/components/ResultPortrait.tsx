import type { CSSProperties } from "react";

/**
 * 結果画面に添える人物写真の枠。
 * Lovable側の実写真は利用許諾が確認できていないため、本番に無断転用しない。
 * 許諾済み画像が用意でき次第 imageSrc を渡せば、そのまま差し替えられる。
 */
export function ResultPortrait({ imageSrc }: { imageSrc?: string }) {
  if (imageSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageSrc} alt="" style={styles.image} />;
  }

  return (
    <div style={styles.placeholder}>
      <p style={styles.placeholderText}>写真素材は準備中です</p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  image: {
    width: "100%",
    aspectRatio: "4 / 5",
    objectFit: "cover",
    borderRadius: 18,
    marginTop: 20,
  },
  placeholder: {
    marginTop: 20,
    aspectRatio: "4 / 5",
    borderRadius: 18,
    background:
      "radial-gradient(circle at 50% 30%, oklch(88% .05 85) 0%, transparent 65%), " +
      "linear-gradient(180deg, oklch(98.5% .008 85), oklch(95.5% .014 85))",
    border: "1px solid rgba(198,169,107,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 12,
    letterSpacing: "0.06em",
    color: "#A08F7E",
  },
};
