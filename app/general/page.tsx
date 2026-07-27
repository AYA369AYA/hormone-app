import { normalizeSource } from "@/lib/source";
import { getJourneyConfig } from "@/lib/journeyConfig";
import { GeneralSelfTest } from "./GeneralSelfTest";

export default async function GeneralPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const source = normalizeSource(params.source);
  const config = getJourneyConfig();

  return <GeneralSelfTest source={source} testUrl={config.testUrl} />;
}
