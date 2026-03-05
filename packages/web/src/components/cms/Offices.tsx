import { Cms } from "@/models/cms";
import { CmsSectionBaseProps, getSectionClasses } from "./shared";

type OfficesProps = Cms.OfficesSection & CmsSectionBaseProps;

export default function Offices({
  tagline,
  heading,
  subheading,
  offices,
  className,
  bgColor,
}: OfficesProps) {
  return (
    <section className={getSectionClasses(bgColor, className)}>
      <div className="container mx-auto px-6">
        <div className="mb-10 max-w-3xl">
          {tagline ? (
            <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {tagline}
            </p>
          ) : null}
          {heading ? (
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">{heading}</h2>
          ) : null}
          {subheading ? (
            <p className="mt-3 whitespace-pre-line font-body text-muted-foreground">{subheading}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(offices ?? []).map((office) => (
            <article key={office.id} className="rounded-lg border border-border/70 bg-card p-5">
              <h3 className="font-display text-xl text-foreground">{office.name}</h3>
              <p className="mt-2 font-body text-sm text-muted-foreground">{office.addressLine}</p>
              <p className="font-body text-sm text-muted-foreground">
                {office.city}, {office.country}
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground/90">
                {office.lat}, {office.lng}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
