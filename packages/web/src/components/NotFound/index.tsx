import { Link } from "@tanstack/react-router";
import { Home, SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-background via-muted/40 to-background px-6 py-14 text-center md:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.16),transparent_55%)]" />

      <div className="relative mx-auto max-w-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background/80 shadow-sm">
          <SearchX className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
        </div>

        <p className="font-body text-xs font-semibold tracking-[0.24em] text-muted-foreground uppercase">
          {t("common.error404")}
        </p>
        <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
          {t("common.notFound")}
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-sm text-muted-foreground md:text-base">
          {t("common.notFoundDescription")}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild size="lg">
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
