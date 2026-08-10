import { normalizeSource } from "@/lib/source";
import { getJourneyConfig } from "@/lib/journeyConfig";
import { HormoneCheckSelfTest } from "./HormoneCheckSelfTest";

export default async function HormoneCheckPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const source = normalizeSource(params.source);
  const config = getJourneyConfig();

  return <HormoneCheckSelfTest source={source} testUrl={config.testUrl} />;
}
