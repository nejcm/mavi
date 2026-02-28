import posthog from "posthog-js";
import { onCLS, onFCP, onLCP, onINP, type Metric } from "web-vitals";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST ?? "https://eu.i.posthog.com";

let posthogEnabled = false;

export function initAnalytics() {
  if (typeof window === "undefined") return;

  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
    });
    posthogEnabled = true;
  }

  function sendToAnalytics(metric: Metric) {
    if (posthogEnabled) {
      posthog.capture("web_vital", {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
      });
    }
    if (import.meta.env.DEV) {
      console.debug("[web-vitals]", metric.name, metric.value, metric.rating);
    }
  }

  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
}

export function trackPageView(path: string, title?: string) {
  if (posthogEnabled) {
    posthog.capture("$pageview", { path, title });
  }
}

export { posthog };
