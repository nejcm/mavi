import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import { getAllNews } from "@/data/news";

export const Route = createFileRoute("/news/")({
  component: NewsListPage,
});

function NewsListPage() {
  const { t, i18n } = useTranslation();
  const posts = getAllNews();

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="container mx-auto px-6 pb-16 pt-36 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground font-body">
            {t("news.eyebrow")}
          </p>
          <h1 className="font-display text-4xl text-foreground md:text-5xl">
            {t("news.pageTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground font-body">
            {t("news.pageDescription")}
          </p>

          <div className="mt-8">
            <Button variant="hero-outline" asChild>
              <Link to="/">{t("news.backHome")}</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-lg border border-border/70 bg-card transition-colors hover:border-primary/40"
            >
              <div className="aspect-16/8 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.date).toLocaleDateString(i18n.language, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="font-display text-2xl text-foreground">
                  <Link
                    to={`/news/${post.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-muted-foreground font-body">
                  {post.excerpt}
                </p>

                <Link
                  to={`/news/${post.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  {t("home.news.readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
