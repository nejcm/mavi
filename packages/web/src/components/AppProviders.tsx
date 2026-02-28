import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { lazy, Suspense, useEffect } from "react";

const LazyDevtools = lazy(() =>
  import("@/components/Devtools").then((m) => ({ default: m.default })),
);
import { useAppStore } from "@/stores/app-store";
import { queryClient } from "@/lib/query-client";
import i18n from "@/i18n";

import { initAnalytics } from "@/lib/analytics";

import "@/i18n";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const locale = useAppStore((s) => s.locale);

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  useEffect(() => {
    const lang = useAppStore.getState().locale;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <LazyDevtools />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}
