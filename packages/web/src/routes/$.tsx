import { useTranslation } from "react-i18next";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: NotFoundPage,
});

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("common.notFound")}</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          {t("common.returnHome")}
        </Link>
      </div>
    </div>
  );
}
