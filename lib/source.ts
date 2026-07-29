export type Source = "instagram" | "book" | "hotel" | "app";

const VALID_SOURCES: readonly Source[] = ["instagram", "book", "hotel", "app"];

export function normalizeSource(
  value: string | string[] | undefined | null
): Source {
  const raw = Array.isArray(value) ? value[0] : value;

  if (raw && (VALID_SOURCES as readonly string[]).includes(raw)) {
    return raw as Source;
  }

  return "app";
}

const KIT_SOURCE_LABELS: Record<Source, string> = {
  instagram: "Instagram",
  book: "Book",
  hotel: "Hotel",
  app: "App",
};

export function toKitSourceLabel(source: Source): string {
  return KIT_SOURCE_LABELS[source];
}
