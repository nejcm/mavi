import { cn } from "@/lib/utils";
import { Cms } from "@/models/cms";
import { CmsActionButton, CmsMedia, CmsSectionBaseProps, getSectionClasses } from "./shared";

const alignMap: Record<Cms.HAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const verticalAlignMap: Record<Cms.VAlign, string> = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
};

type HorizontalProps = Cms.HorizontalSection & CmsSectionBaseProps;

export default function Horizontal({
  tagline,
  heading,
  content,
  contentAlign = "left",
  button,
  button2,
  image,
  video,
  mediaPosition = "right",
  verticalAlign = "center",
  className,
  bgColor,
}: HorizontalProps) {
  const isMediaLeft = mediaPosition === "left";
  const hasMedia = !!image || !!video;

  return (
    <section className={getSectionClasses(bgColor, className)}>
      <div
        className={cn(
          "container mx-auto grid gap-8 px-6",
          hasMedia ? "lg:grid-cols-2" : "lg:grid-cols-1",
          verticalAlignMap[verticalAlign],
        )}
      >
        <div className={cn("space-y-5", alignMap[contentAlign], isMediaLeft ? "lg:order-2" : "")}>
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
          <div
            className={cn(
              "flex flex-wrap gap-3",
              contentAlign === "center" ? "justify-center" : "",
            )}
          >
            <CmsActionButton button={button} />
            <CmsActionButton button={button2} />
          </div>
        </div>
        {hasMedia ? (
          <div
            className={cn(
              "aspect-video overflow-hidden rounded-md border border-border/70 bg-muted",
              isMediaLeft ? "lg:order-1" : "",
            )}
          >
            <CmsMedia image={image} video={video} alt={heading} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
