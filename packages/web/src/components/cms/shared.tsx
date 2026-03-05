import { Button } from "@/components/ui/button";
import { API_BASE } from "@/data";
import { cn } from "@/lib/utils";
import { Cms } from "@/models/cms";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";

const buttonVariantMap: Record<
  NonNullable<Cms.Button["type"]>,
  "hero" | "hero-outline" | "link"
> = {
  solid: "hero",
  outline: "hero-outline",
  link: "link",
};

const buttonSizeMap: Record<Cms.Sizes, "sm" | "default" | "lg"> = {
  none: "default",
  xs: "sm",
  sm: "sm",
  md: "default",
  lg: "lg",
  xl: "lg",
  "2xl": "lg",
};

const buttonColorMap: Record<NonNullable<Cms.Button["colorScheme"]>, string> = {
  default: "",
  black: "bg-foreground text-background hover:bg-foreground/90",
  white: "bg-background text-foreground hover:bg-background/90",
  red: "bg-red-600 text-white hover:bg-red-500",
  green: "bg-emerald-600 text-white hover:bg-emerald-500",
  blue: "bg-blue-600 text-white hover:bg-blue-500",
};

export type CmsSectionBaseProps = {
  className?: string;
  bgColor?: Cms.BgColors;
};

const iconBgColorMap: Record<Cms.Colors, string> = {
  none: "bg-muted",
  "c-1": "bg-primary",
  "c-2": "bg-emerald-600",
  "c-3": "bg-blue-600",
  "c-4": "bg-orange-500",
};

const bgMap: Record<Cms.BgColors, string> = {
  none: "",
  "bg-1": "bg-background",
  "bg-2": "bg-secondary/60",
  "bg-3": "bg-muted/50",
  "bg-4": "bg-card",
};

const iconSizeMap: Record<Cms.Sizes, string> = {
  none: "h-10 w-10",
  xs: "h-8 w-8",
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
  xl: "h-16 w-16",
  "2xl": "h-20 w-20",
};

export function getSectionClasses(bgColor?: Cms.BgColors, className?: string) {
  return cn(bgMap[bgColor ?? "none"], className);
}

export function getMediaUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_BASE}${url}`;
}

export function CmsMedia({
  image,
  video,
  className,
  alt,
  poster,
}: {
  image?: Cms.StrapiMedia["attributes"];
  video?: Cms.Video;
  className?: string;
  alt?: string;
  poster?: Cms.StrapiMedia["attributes"];
}) {
  const { t } = useTranslation();
  const videoUrl = getMediaUrl(video?.file?.url);
  const imageUrl = getMediaUrl(image?.url);
  const posterUrl = getMediaUrl(poster?.url) ?? imageUrl;

  if (videoUrl) {
    return (
      <video
        className={cn("h-full w-full rounded-md object-cover", className)}
        controls
        autoPlay={video?.autoplay}
        muted={video?.autoplay}
        loop={video?.autoplay}
        playsInline
        poster={posterUrl}
      >
        <source src={videoUrl} type={video?.file?.mime} />
      </video>
    );
  }

  if (!imageUrl) return null;

  return (
    <img
      src={imageUrl}
      alt={alt ?? image?.alternativeText ?? image?.name ?? t("common.sectionImage")}
      className={cn("h-full w-full rounded-md object-cover", className)}
      loading="lazy"
    />
  );
}

export function CmsActionButton({ button }: { button?: Cms.Button }) {
  if (!button?.text) return null;

  const variant = buttonVariantMap[button.type ?? "solid"];
  const size = buttonSizeMap[button.size ?? "md"];
  const className = buttonColorMap[button.colorScheme ?? "default"];

  if (!button.url) {
    return (
      <Button type="button" variant={variant} size={size} className={className}>
        {button.text}
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={button.url} target={button.blank ? "_blank" : undefined} rel="noreferrer">
        {button.text}
      </a>
    </Button>
  );
}

type LucideIconComponent = (props: { className?: string }) => JSX.Element;

export function CmsIconBadge({
  icon,
  index,
  className,
}: {
  icon?: Cms.Icon;
  index?: number;
  className?: string;
}) {
  if (!icon) return null;

  const iconValue = icon.icon as unknown;
  const iconName =
    typeof iconValue === "string"
      ? iconValue
      : iconValue && typeof iconValue === "object" && "name" in iconValue
        ? (iconValue as { name?: string }).name
        : undefined;
  const isNumber = "isNumber" in icon ? Boolean(icon.isNumber) : false;
  const NamedIcon = (
    iconName ? LucideIcons[iconName as keyof typeof LucideIcons] : null
  ) as LucideIconComponent | null;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full text-white",
        iconBgColorMap[icon.color ?? "none"],
        iconSizeMap[icon.size ?? "md"],
        className,
      )}
      aria-hidden="true"
    >
      {isNumber ? (
        <span className="text-sm font-semibold leading-none">{(index ?? 0) + 1}</span>
      ) : NamedIcon ? (
        <NamedIcon className="h-5 w-5" />
      ) : null}
    </span>
  );
}
