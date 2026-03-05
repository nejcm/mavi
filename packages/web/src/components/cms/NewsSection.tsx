import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getLatestNews } from "@/data/news";
import { Cms } from "@/models/cms";
import { CmsSectionBaseProps, getSectionClasses } from "./shared";

type NewsSectionProps = Cms.NewsSection & CmsSectionBaseProps;

export default function NewsSection({
  tagline,
  heading,
  subheading,
  limit = 3,
  className,
  bgColor,
}: NewsSectionProps) {
  const { t, i18n } = useTranslation();
  const posts = getLatestNews(Math.max(1, limit));

  return (
    <section className={getSectionClasses(bgColor, className)}>
      <div className="container mx-auto px-6">
        <div className="mb-10">
          {tagline ? (
            <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {tagline}
            </p>
          ) : null}
          {heading ? (
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">{heading}</h2>
          ) : null}
          {subheading ? (
            <p className="mt-3 max-w-2xl whitespace-pre-line font-body text-muted-foreground">
              {subheading}
            </p>
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-lg border border-border/70 bg-card"
            >
              <div className="aspect-video">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3 p-5">
                <p className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {new Date(post.date).toLocaleDateString(i18n.language)}
                </p>
                <h3 className="font-display text-xl text-foreground">{post.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{post.excerpt}</p>
                <Link
                  to="/news/$slug"
                  params={{ slug: post.slug }}
                  className="inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
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
}
