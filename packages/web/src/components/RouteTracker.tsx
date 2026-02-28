import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { trackPageView } from "@/lib/analytics";

export function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);

  return null;
}
