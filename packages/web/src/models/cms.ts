export const sectionTypes = [
  "hero",
  "vertical",
  "horizontal",
  "grid",
  "news-section",
  "offices",
  "logos",
] as const;

export namespace Cms {
  export const locales = ["sl", "en", "hr"] as const;
  export type Sizes = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  export type Colors = "none" | "c-1" | "c-2" | "c-3" | "c-4";
  export type BgColors = "none" | "bg-1" | "bg-2" | "bg-3" | "bg-4";
  export type HAlign = "left" | "right" | "center";
  export type VAlign = "top" | "center" | "bottom";

  export type Locale = (typeof locales)[number];
  export type SectionType = (typeof sectionTypes)[number];

  export type StrapiEntity<T> = {
    id: number;
    attributes: T;
  };

  export type StrapiMedia = StrapiEntity<{
    name?: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number;
    height?: number;
    formats?: Record<string, unknown>;
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    url: string;
    previewUrl?: string | null;
  }>;

  // shared.*
  export type Icon = {
    id: number;
    icon?: string | { name?: string };
    size?: Sizes;
    color?: Colors;
    isNumber?: boolean;
  };

  export type Video = {
    id: number;
    text?: string;
    file?: StrapiMedia["attributes"];
    autoplay?: boolean;
  };

  export type Button = {
    id: number;
    type?: "solid" | "link" | "outline";
    colorScheme?: "default" | "black" | "white" | "red" | "green" | "blue";
    size?: Sizes;
    text: string;
    url?: string;
    blank?: boolean;
  };

  export type Slide = {
    id: number;
    image?: StrapiMedia["attributes"];
    video?: Video;
    heading?: string;
    content?: string;
    button?: Button;
    button2?: Button;
  };

  export type GridItem = {
    id: number;
    heading?: string;
    tagline?: string;
    content?: string;
    image?: StrapiMedia["attributes"];
    video?: Video;
    icon?: Icon;
    mediaPosition?: "top" | "right" | "bottom" | "left";
    align?: HAlign;
  };

  export type Logo = {
    id: number;
    name: string;
    url?: string;
    image: StrapiMedia["attributes"];
  };

  export type Office = {
    id: number;
    name: string;
    addressLine: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };

  export type Seo = {
    id: number;
    metaTitle: string;
    metaDescription: string;
    shareImage?: StrapiMedia["attributes"];
  };

  // section.*
  export type HeroSection = {
    id: number;
    __component: "section.hero";
    name?: string;
    slides?: Slide[];
  };

  export type VerticalSection = {
    id: number;
    __component: "section.vertical";
    name?: string;
    heading?: string;
    content?: string;
    contentAlign?: HAlign;
    button?: Button;
    button2?: Button;
    image?: StrapiMedia["attributes"];
    video?: Video;
  };

  export type HorizontalSection = {
    id: number;
    __component: "section.horizontal";
    name?: string;
    tagline?: string;
    heading?: string;
    content?: string;
    contentAlign?: HAlign;
    button?: Button;
    button2?: Button;
    image?: StrapiMedia["attributes"];
    video?: Video;
    mediaPosition?: "left" | "right";
    verticalAlign?: VAlign;
  };

  export type GridSection = {
    id: number;
    __component: "section.grid";
    name?: string;
    tagline?: string;
    heading?: string;
    content?: string;
    button?: Button;
    button2?: Button;
    align?: HAlign;
    perRow?: number;
    items?: GridItem[];
  };

  export type NewsSection = {
    id: number;
    __component: "section.news-section";
    name?: string;
    tagline?: string;
    heading?: string;
    subheading?: string;
    limit?: number;
  };

  export type OfficesSection = {
    id: number;
    __component: "section.offices";
    name?: string;
    tagline?: string;
    heading?: string;
    subheading?: string;
    offices?: Office[];
  };

  export type LogosSection = {
    id: number;
    __component: "section.logos";
    name?: string;
    tagline?: string;
    heading?: string;
    content?: string;
    logos?: Logo[];
  };

  export type InnerSection =
    | HeroSection
    | VerticalSection
    | HorizontalSection
    | GridSection
    | NewsSection
    | OfficesSection
    | LogosSection;

  export type Section = StrapiEntity<{
    name: string;
    section?: InnerSection[];
    createdAt?: string;
    updatedAt?: string;
  }>;

  // page.*
  export type PageSection = {
    id: number;
    __component: "page.section";
    name: string;
    background?: BgColors;
    spaceTop?: Sizes;
    spaceBottom?: Sizes;
    section?: Section["attributes"];
  };

  // api::page.page
  export type Page = {
    id: number;
    name: string;
    slug: string;
    language?: Locale;
    createdAt?: string;
    updatedAt?: string;
    seo?: Seo;
    sections?: PageSection[];
  };

  // api::job.job
  export type Job = StrapiEntity<{
    language: Locale;
    title: string;
    description: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    createdAt?: string;
    updatedAt?: string;
  }>;
}
