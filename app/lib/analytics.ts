export type EventName =
  | "demo_requested"
  | "project_viewed"
  | "case_study_read"
  | "service_viewed"
  | "contact_form_submitted"
  | "newsletter_signup"
  | "resume_downloaded"
  | "github_link_clicked"
  | "live_demo_clicked";

export interface EventParams {
  project_slug?: string;
  service_slug?: string;
  source_page?: string;
  form_type?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    va?: (event: string, params?: Record<string, any>) => void;
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: EventName, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...params,
  };

  // Vercel Analytics
  if (window.va) {
    window.va(eventName, params);
  }

  // Google Analytics (if configured)
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }

  // Console logging for development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventData);
  }
}

export function trackDemoRequested(params: { source: string; organization?: string }) {
  trackEvent("demo_requested", {
    source_page: params.source,
    organization: params.organization,
  });
}

export function trackProjectViewed(params: { project_slug: string; source_page?: string }) {
  trackEvent("project_viewed", {
    project_slug: params.project_slug,
    source_page: params.source_page || window.location.pathname,
  });
}

export function trackCaseStudyRead(params: { project_slug: string; time_spent?: number }) {
  trackEvent("case_study_read", {
    project_slug: params.project_slug,
    time_spent: params.time_spent,
  });
}

export function trackServiceViewed(params: { service_slug: string; source_page?: string }) {
  trackEvent("service_viewed", {
    service_slug: params.service_slug,
    source_page: params.source_page || window.location.pathname,
  });
}

export function trackContactFormSubmitted(params: { form_type: string; source_page?: string }) {
  trackEvent("contact_form_submitted", {
    form_type: params.form_type,
    source_page: params.source_page || window.location.pathname,
  });
}

export function trackResumeDownloaded() {
  trackEvent("resume_downloaded", {
    source_page: window.location.pathname,
  });
}

export function trackGithubLinkClicked(params: { repo?: string }) {
  trackEvent("github_link_clicked", {
    repo: params.repo,
    source_page: window.location.pathname,
  });
}

export function trackLiveDemoClicked(params: { project_slug: string }) {
  trackEvent("live_demo_clicked", {
    project_slug: params.project_slug,
    source_page: window.location.pathname,
  });
}