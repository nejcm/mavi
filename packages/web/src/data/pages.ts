import { API_BASE } from ".";
import { Cms, sectionTypes } from "../models/cms";

type StrapiCollectionResponse<T> = {
  data: T[];
};

export async function fetchPageBySlug(slug = "", lang = "sl"): Promise<Cms.Page> {
  const url = new URL("/api/pages", API_BASE);
  url.searchParams.set("filters[slug][$eq]", slug);
  if (lang) {
    url.searchParams.set("filters[language][$eq]", lang);
  }
  url.searchParams.set("populate[seo]", "true");
  // Strapi v5: `sections` is a dynamic zone, so use `on` for component-specific populate.
  url.searchParams.set("populate[sections][on][page.section][populate][section]", "true");
  // `api::section.section` has its own dynamic zone (`section`) containing section.* components.
  // Populate all nested fields/components/media for each allowed section component.
  for (const componentName of sectionTypes) {
    url.searchParams.set(
      `populate[sections][on][page.section][populate][section][populate][section][on][section.${componentName}][populate]`,
      "*",
    );
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to load page");
  }

  const json = (await res.json()) as StrapiCollectionResponse<Cms.Page>;

  if (!json.data?.length) {
    throw new Error("Page not found");
  }

  return json.data[0]!;
}

export const fetchPageBySlugQueryKey = (slug: string, lang?: string) =>
  ["page", "bySlug", slug, lang] as const;
export const fetchPageBySlugQuery = (slug: string, lang?: string) => ({
  queryKey: fetchPageBySlugQueryKey(slug.trim(), lang),
  queryFn: () => fetchPageBySlug(slug.trim(), lang),
});
