import type { CSSProperties } from "react";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudyCarousel() {
  return (
    <div style={styles.track}>
      {CASE_STUDIES.map((study) => (
        <CaseStudyCard key={study.id} study={study} />
      ))}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  track: {
    display: "flex",
    gap: 14,
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    paddingBottom: 8,
    marginLeft: -28,
    marginRight: -28,
    paddingLeft: 28,
    paddingRight: 28,
  },
};
