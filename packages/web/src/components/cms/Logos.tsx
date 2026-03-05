import { Cms } from "@/models/cms";
import { CmsSectionBaseProps, getMediaUrl, getSectionClasses } from "./shared";

type LogosProps = Cms.LogosSection & CmsSectionBaseProps;

export default function Logos({
  tagline,
  heading,
  content,
  logos,
  className,
  bgColor,
}: LogosProps) {
  const entries = logos ?? [];

  return (
    <section className={getSectionClasses(bgColor, className)}>
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          {tagline ? (
            <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {tagline}
            </p>
          ) : null}
          {heading ? (
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">{heading}</h2>
          ) : null}
          {content ? (
            <p className="mt-3 whitespace-pre-line font-body text-muted-foreground">{content}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {entries.map((logo) => {
            const imgUrl = getMediaUrl(logo.image.url);
            if (!imgUrl) return null;
            const entry = (
              <div className="flex h-24 items-center justify-center rounded-lg border border-border/70 bg-card px-4">
                <img
                  src={imgUrl}
                  alt={logo.image.alternativeText ?? logo.name}
                  className="max-h-14 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            );

            if (!logo.url) {
              return <div key={logo.id}>{entry}</div>;
            }

            return (
              <a
                key={logo.id}
                href={logo.url}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                {entry}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
