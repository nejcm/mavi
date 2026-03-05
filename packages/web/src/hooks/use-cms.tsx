import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ClassNameValue } from "tailwind-merge";
import Grid from "../components/cms/Grid";
import Hero from "../components/cms/Hero";
import Horizontal from "../components/cms/Horizontal";
import Logos from "../components/cms/Logos";
import NewsSection from "../components/cms/NewsSection";
import Offices from "../components/cms/Offices";
import Vertical from "../components/cms/Vertical";
import { fetchPageBySlugQuery } from "../data/pages";
import { Cms } from "../models/cms";

const sectionMap: Record<`section.${Cms.SectionType}`, React.ComponentType<any>> = {
  "section.vertical": Vertical,
  "section.horizontal": Horizontal,
  "section.hero": Hero,
  "section.grid": Grid,
  "section.news-section": NewsSection,
  "section.offices": Offices,
  "section.logos": Logos,
};
const spaceMap: Record<Cms.Sizes, ClassNameValue> = {
  none: "p-0",
  xs: "p-6 sm:p-8 md:p-12",
  sm: "p-12 md:p-16 lg:p-20",
  md: "p-20 md:p-20 lg:p-28",
  lg: "p-24 md:p-28 lg:p-36",
  xl: "p-32 md:p-40 lg:p-48",
  "2xl": "p-40 md:p-48 lg:p-56",
};

export const useCmsPage = (slug?: string, lang?: string) => {
  const query = useQuery(fetchPageBySlugQuery(slug || "", lang));
  const { seo, sections } = query.data || {};
  const ui = useMemo(() => {
    if (!sections) return null;
    return (
      <>
        {sections.map((item, idx) => {
          const { section, background, spaceTop, spaceBottom } = item;
          const innerSection = section?.section?.[0];
          const type = innerSection?.__component;
          if (!innerSection || !type) return null;
          const Component = sectionMap[type];
          if (!Component) return null;
          return (
            <Component
              key={idx}
              data-id={type}
              bgColor={background}
              className={`${spaceMap[spaceBottom ?? "md"]} ${spaceMap[spaceTop ?? "md"]}`}
              {...(innerSection as Record<string, any>)}
            />
          );
        })}
      </>
    );
  }, [sections]);

  return {
    query,
    ui,
    meta: seo
      ? {
          title: seo.metaTitle,
          description: seo.metaDescription,
          image: seo.shareImage,
        }
      : undefined,
  };
};
