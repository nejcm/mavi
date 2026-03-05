import { cn } from "@/lib/utils";
import { Cms } from "@/models/cms";
import {
  CmsActionButton,
  CmsIconBadge,
  CmsMedia,
  CmsSectionBaseProps,
  getSectionClasses,
} from "./shared";

const alignMap: Record<Cms.HAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const perRowMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const mediaPositionMap: Record<NonNullable<Cms.GridItem["mediaPosition"]>, string> = {
  top: "flex-col",
  right: "flex-col lg:flex-row",
  bottom: "flex-col",
  left: "flex-col lg:flex-row-reverse",
};

type GridProps = Cms.GridSection & CmsSectionBaseProps;

export default function Grid({
  tagline,
  heading,
  content,
  button,
  button2,
  align = "left",
  perRow = 3,
  items,
  className,
  bgColor,
}: GridProps) {
  const colClass = perRowMap[Math.min(4, Math.max(1, perRow))] ?? perRowMap[3];

  return (
    <section className={getSectionClasses(bgColor, className)}>
      <div className={cn("container mx-auto px-6", alignMap[align])}>
        <div className="mx-auto max-w-4xl space-y-4">
          {tagline ? (
            <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {tagline}
            </p>
          ) : null}
          {heading ? (
            <h2 className="font-display text-3xl text-foreground md:text-4xl">{heading}</h2>
          ) : null}
          {content ? (
            <p className="whitespace-pre-line font-body leading-relaxed text-muted-foreground">
              {content}
            </p>
          ) : null}
          <div className={cn("flex flex-wrap gap-3", align === "center" ? "justify-center" : "")}>
            <CmsActionButton button={button} />
            <CmsActionButton button={button2} />
          </div>
        </div>

        <div className={cn("mt-10 grid gap-6", colClass)}>
          {(items ?? []).map((item, index) => {
            const mediaPosition = item.mediaPosition ?? "top";
            const hasMedia = !!item.image || !!item.video;
            const hasIcon = !!item.icon;
            const mediaFirst = mediaPosition === "top" || mediaPosition === "left";

            const mediaUi = hasMedia ? (
              <div
                className={cn(
                  "bg-muted",
                  mediaPosition === "left" || mediaPosition === "right"
                    ? "w-full lg:w-1/2"
                    : "w-full",
                  mediaPosition === "top" || mediaPosition === "bottom"
                    ? "aspect-video"
                    : "aspect-video lg:aspect-auto",
                )}
              >
                <CmsMedia
                  image={item.image}
                  video={item.video}
                  alt={item.heading}
                  className="rounded-none"
                />
              </div>
            ) : null;

            const contentUi = (
              <div
                className={cn(
                  "space-y-2 p-5",
                  item.align === "center" ? "text-center" : "text-left",
                )}
              >
                <CmsIconBadge
                  icon={item.icon}
                  index={index}
                  className={hasIcon ? "mb-2" : undefined}
                />
                {item.tagline ? (
                  <p className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.tagline}
                  </p>
                ) : null}
                {item.heading ? (
                  <h3 className="font-display text-xl text-foreground">{item.heading}</h3>
                ) : null}
                {item.content ? (
                  <p className="whitespace-pre-line font-body text-sm leading-relaxed text-muted-foreground">
                    {item.content}
                  </p>
                ) : null}
              </div>
            );

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-lg border border-border/70 bg-card"
              >
                <div className={cn("flex h-full", mediaPositionMap[mediaPosition])}>
                  {mediaFirst ? mediaUi : null}
                  <div
                    className={cn(
                      hasMedia && (mediaPosition === "left" || mediaPosition === "right")
                        ? "w-full lg:w-1/2"
                        : "w-full",
                    )}
                  >
                    {contentUi}
                  </div>
                  {!mediaFirst ? mediaUi : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
