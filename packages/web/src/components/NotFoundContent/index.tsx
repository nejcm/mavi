import { Link } from "@tanstack/react-router";
import { Home, SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export default function NotFoundContent() {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-10 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-xl text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-border bg-background/80 shadow-sm">
          <SearchX className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        </div>

        <h3 className="font-display text-2xl text-foreground md:text-3xl">
          {t("common.notFound")}
        </h3>
        <p className="mx-auto mt-3 max-w-md font-body text-sm text-muted-foreground">
          {t("common.notFoundContentDescription")}
        </p>

        <div className="mt-6 flex items-center justify-center">
          <Button asChild variant="outline">
            <Link to="/">
              <Home aria-hidden="true" />
              {t("common.returnHome")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
