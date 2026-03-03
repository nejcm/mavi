import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { getLatestNews } from "@/data/news";

const latestNews = getLatestNews(3);

const NewsSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="news" className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground font-body">
              {t("home.news.eyebrow")}
            </p>
            <h2 className="font-display text-3xl text-foreground md:text-4xl">
              {t("home.news.heading")}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground font-body">
              {t("home.news.subheading")}
            </p>
          </div>

          <Button variant="hero-outline" asChild>
            <Link to="/news">{t("home.news.viewAll")}</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latestNews.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-lg border border-border/70 bg-card transition-colors hover:border-primary/40"
            >
              <div className="aspect-16/10 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground font-body">
                  {new Date(post.date).toLocaleDateString(i18n.language, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h3 className="font-display text-xl text-foreground">{post.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground font-body">{post.excerpt}</p>

                <Link
                  to="/news/$slug"
                  params={{ slug: post.slug }}
                  className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  {t("home.news.readMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
