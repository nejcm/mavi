import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import { getNewsBySlug } from "@/data/news";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const post = getNewsBySlug(params.slug);

    if (!post) {
      throw notFound();
    }

    return post;
  },
  component: NewsDetailPage,
});

function NewsDetailPage() {
  const post = Route.useLoaderData();
  const { t, i18n } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article className="container mx-auto max-w-4xl px-6 pb-16 pt-36 md:pt-40">
        <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">
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

        <h1 className="font-display text-4xl text-foreground md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground font-body">{post.excerpt}</p>

        <div className="mt-8 flex gap-3">
          <Button variant="hero-outline" asChild>
            <Link to="/news">{t("news.backToNews")}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/">{t("news.backHome")}</Link>
          </Button>
        </div>

        <div className="mt-10 space-y-5 text-base leading-7 text-foreground/90 font-body">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}

