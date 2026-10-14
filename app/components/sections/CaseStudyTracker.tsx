"use client";

import { useEffect } from "react";
import { trackCaseStudyRead } from "../../lib/analytics";

type Props = {
  projectSlug: string;
};

export default function CaseStudyTracker({ projectSlug }: Props) {
  useEffect(() => {
    const startTime = Date.now();

    trackCaseStudyRead({
      project_slug: projectSlug,
    });

    // Track time spent on page
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackCaseStudyRead({
        project_slug: projectSlug,
        time_spent: timeSpent,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [projectSlug]);

  return null;
}