import type { Schema, Struct } from "@strapi/strapi";

export interface ComponentButton extends Struct.ComponentSchema {
  collectionName: "components_component_buttons";
  info: {
    description: "";
    displayName: "Button";
    icon: "cube";
  };
  attributes: {
    blank: Schema.Attribute.Boolean;
    text: Schema.Attribute.String;
    tip: Schema.Attribute.Enumeration<["link", "button"]> & Schema.Attribute.DefaultTo<"button">;
    url: Schema.Attribute.String;
  };
}

export interface ComponentGridItem extends Struct.ComponentSchema {
  collectionName: "components_component_grid_items";
  info: {
    description: "";
    displayName: "Grid item";
    icon: "cube";
  };
  attributes: {
    gumb: Schema.Attribute.Component<"component.button", false>;
    gumb_2: Schema.Attribute.Component<"component.button", false>;
    ikona: Schema.Attribute.Component<"component.icon", false>;
    medij: Schema.Attribute.Media<"images" | "videos">;
    naslov: Schema.Attribute.String;
    text: Schema.Attribute.RichText;
    velikNaslov: Schema.Attribute.String;
  };
}

export interface ComponentIcon extends Struct.ComponentSchema {
  collectionName: "components_component_icons";
  info: {
    displayName: "Icon";
    icon: "puzzle";
  };
  attributes: {
    barva: Schema.Attribute.String & Schema.Attribute.CustomField<"plugin::color-picker.color">;
    ikona: Schema.Attribute.String;
    velikost: Schema.Attribute.Enumeration<["xs", "sm", "md", "lg", "xl", "xxl"]>;
  };
}

export interface ComponentSlide extends Struct.ComponentSchema {
  collectionName: "components_component_slides";
  info: {
    description: "";
    displayName: "Slide";
    icon: "puzzle";
  };
  attributes: {
    gumb: Schema.Attribute.Component<"component.button", true>;
    medij: Schema.Attribute.Media<"images" | "videos">;
    pozicija: Schema.Attribute.Enumeration<
      ["top-left", "left", "bottom-left", "center", "top-right", "right", "bottom-right"]
    > &
      Schema.Attribute.DefaultTo<"center">;
    text: Schema.Attribute.RichText;
  };
}

export interface PagePageSection extends Struct.ComponentSchema {
  collectionName: "components_page_page_sections";
  info: {
    description: "";
    displayName: "Page section";
    icon: "puzzle";
  };
  attributes: {
    barva: Schema.Attribute.String & Schema.Attribute.CustomField<"plugin::color-picker.color">;
    povezano: Schema.Attribute.Boolean;
    sekcija: Schema.Attribute.Relation<"oneToOne", "api::section.section">;
  };
}

export interface SectionCareers extends Struct.ComponentSchema {
  collectionName: "components_section_careers";
  info: {
    displayName: "Careers";
    icon: "puzzle";
  };
  attributes: {
    naslov: Schema.Attribute.String;
  };
}

export interface SectionCta extends Struct.ComponentSchema {
  collectionName: "components_section_ctas";
  info: {
    description: "";
    displayName: "CTA";
    icon: "puzzle";
  };
  attributes: {
    gumb: Schema.Attribute.Component<"component.button", true>;
    naslov: Schema.Attribute.String;
    slika: Schema.Attribute.Media<"images">;
    text: Schema.Attribute.RichText;
  };
}

export interface SectionGridSection extends Struct.ComponentSchema {
  collectionName: "components_section_grid_sections";
  info: {
    description: "";
    displayName: "Grid section";
    icon: "puzzle";
  };
  attributes: {
    elementi: Schema.Attribute.Component<"component.grid-item", true> & Schema.Attribute.Required;
    gumb: Schema.Attribute.Component<"component.button", true>;
    naslov: Schema.Attribute.String;
    postavitev: Schema.Attribute.Enumeration<["left", "right", "center"]>;
    text: Schema.Attribute.RichText;
  };
}

export interface SectionHorizontalSection extends Struct.ComponentSchema {
  collectionName: "components_section_horizontal_sections";
  info: {
    displayName: "Horizontal section";
    icon: "puzzle";
  };
  attributes: {
    gumb: Schema.Attribute.Component<"component.button", true>;
    medij: Schema.Attribute.Media<"images" | "videos">;
    naslov: Schema.Attribute.String;
    obratno: Schema.Attribute.Boolean;
    text: Schema.Attribute.RichText;
  };
}

export interface SectionLocations extends Struct.ComponentSchema {
  collectionName: "components_section_locations";
  info: {
    displayName: "Locations";
    icon: "puzzle";
  };
  attributes: {
    naslov: Schema.Attribute.String;
    zemljevid: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface SectionNews extends Struct.ComponentSchema {
  collectionName: "components_section_news";
  info: {
    displayName: "News";
    icon: "puzzle";
  };
  attributes: {
    limit: Schema.Attribute.Integer;
    naslov: Schema.Attribute.String;
    text: Schema.Attribute.RichText;
  };
}

export interface SectionSliderSection extends Struct.ComponentSchema {
  collectionName: "components_section_slider_sections";
  info: {
    description: "";
    displayName: "Slider section";
    icon: "cube";
  };
  attributes: {
    slides: Schema.Attribute.Component<"component.slide", true>;
    tip: Schema.Attribute.Enumeration<["fullscreen", "grid"]>;
  };
}

export interface SectionVerticalSection extends Struct.ComponentSchema {
  collectionName: "components_section_vertical_sections";
  info: {
    description: "";
    displayName: "Vertical section";
    icon: "puzzle";
  };
  attributes: {
    gumb: Schema.Attribute.Component<"component.button", true>;
    medij: Schema.Attribute.Media<"images" | "videos">;
    naslov: Schema.Attribute.String;
    obratno: Schema.Attribute.Boolean;
    text: Schema.Attribute.RichText;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: "components_shared_media";
  info: {
    displayName: "Media";
    icon: "file-video";
  };
  attributes: {
    file: Schema.Attribute.Media<"images" | "files" | "videos">;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: "components_shared_quotes";
  info: {
    displayName: "Quote";
    icon: "indent";
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: "components_shared_rich_texts";
  info: {
    description: "";
    displayName: "Rich text";
    icon: "align-justify";
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: "components_shared_seos";
  info: {
    description: "";
    displayName: "Seo";
    icon: "allergies";
    name: "Seo";
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<"images">;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: "components_shared_sliders";
  info: {
    description: "";
    displayName: "Slider";
    icon: "address-book";
  };
  attributes: {
    files: Schema.Attribute.Media<"images", true>;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "component.button": ComponentButton;
      "component.grid-item": ComponentGridItem;
      "component.icon": ComponentIcon;
      "component.slide": ComponentSlide;
      "page.page-section": PagePageSection;
      "section.careers": SectionCareers;
      "section.cta": SectionCta;
      "section.grid-section": SectionGridSection;
      "section.horizontal-section": SectionHorizontalSection;
      "section.locations": SectionLocations;
      "section.news": SectionNews;
      "section.slider-section": SectionSliderSection;
      "section.vertical-section": SectionVerticalSection;
      "shared.media": SharedMedia;
      "shared.quote": SharedQuote;
      "shared.rich-text": SharedRichText;
      "shared.seo": SharedSeo;
      "shared.slider": SharedSlider;
    }
  }
}
