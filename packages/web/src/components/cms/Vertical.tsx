import { cn } from "@/lib/utils";
import { Cms } from "@/models/cms";
import { CmsActionButton, CmsMedia, CmsSectionBaseProps, getSectionClasses } from "./shared";

const contentAlignMap: Record<Cms.HAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

type VerticalProps = Cms.VerticalSection & CmsSectionBaseProps;

export default function Vertical({
  heading,
  content,
  contentAlign = "left",
  button,
  button2,
  image,
  video,
  className,
  bgColor,
}: VerticalProps) {
  const alignClass = contentAlignMap[contentAlign];
  const hasMedia = !!image || !!video;

  return (
    <section className={getSectionClasses(bgColor, className)}>
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "mx-auto flex max-w-5xl flex-col gap-10",
            contentAlign === "center" ? "items-center" : "",
          )}
        >
          <div className={cn("w-full space-y-5", alignClass)}>
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
            <div className="w-full overflow-hidden rounded-md border border-border/70 bg-muted">
              <div className="aspect-video">
                <CmsMedia image={image} video={video} alt={heading} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
