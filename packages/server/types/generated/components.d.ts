import type { Schema, Struct } from '@strapi/strapi';

export interface PageSection extends Struct.ComponentSchema {
  collectionName: 'page_section';
  info: {
    displayName: 'Page Section';
    icon: 'layer-group';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<
      ['none', 'bg-1', 'bg-2', 'bg-3', 'bg-4']
    >;
    section: Schema.Attribute.Relation<'manyToOne', 'api::section.section'> &
      Schema.Attribute.Required;
    spaceBottom: Schema.Attribute.Enumeration<
      ['none', 'xl', 'lg', 'md', 'sm', 'xs']
    >;
    spaceTop: Schema.Attribute.Enumeration<
      ['none', 'xl', 'lg', 'md', 'sm', 'xs']
    >;
  };
}

export interface SectionGrid extends Struct.ComponentSchema {
  collectionName: 'section_grids';
  info: {
    displayName: 'Grid';
    icon: 'th';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'right', 'center']>;
    button: Schema.Attribute.Component<'shared.button', false>;
    button2: Schema.Attribute.Component<'shared.button', false>;
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.grid-item', true>;
    name: Schema.Attribute.String;
    perRow: Schema.Attribute.Integer;
    tagline: Schema.Attribute.String;
  };
}

export interface SectionHero extends Struct.ComponentSchema {
  collectionName: 'section_heroes';
  info: {
    displayName: 'Hero';
    icon: 'layout';
  };
  attributes: {
    name: Schema.Attribute.String;
    slides: Schema.Attribute.Component<'shared.slide', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
        },
        number
      >;
  };
}

export interface SectionHorizontal extends Struct.ComponentSchema {
  collectionName: 'section_horizontals';
  info: {
    displayName: 'Horizontal';
    icon: 'columns';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    button2: Schema.Attribute.Component<'shared.button', false>;
    content: Schema.Attribute.RichText;
    contentAlign: Schema.Attribute.Enumeration<['left', 'right', 'center']>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    mediaPosition: Schema.Attribute.Enumeration<['right', 'left']>;
    name: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
    verticalAlign: Schema.Attribute.Enumeration<['top', 'center', 'bottom']>;
    video: Schema.Attribute.Component<'shared.video', false>;
  };
}

export interface SectionLogos extends Struct.ComponentSchema {
  collectionName: 'section_logos';
  info: {
    displayName: 'Logos';
    icon: 'gallery';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    logos: Schema.Attribute.Component<'shared.logo', true>;
    name: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
  };
}

export interface SectionNewsSection extends Struct.ComponentSchema {
  collectionName: 'section_news';
  info: {
    displayName: 'News section';
    icon: 'newspaper';
  };
  attributes: {
    heading: Schema.Attribute.String;
    limit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 9;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    name: Schema.Attribute.String;
    subheading: Schema.Attribute.RichText;
    tagline: Schema.Attribute.String;
  };
}

export interface SectionOffices extends Struct.ComponentSchema {
  collectionName: 'section_offices';
  info: {
    displayName: 'Offices';
    icon: 'map-pin';
  };
  attributes: {
    heading: Schema.Attribute.String;
    name: Schema.Attribute.String;
    offices: Schema.Attribute.Component<'shared.office', true>;
    subheading: Schema.Attribute.RichText;
    tagline: Schema.Attribute.String;
  };
}

export interface SectionVertical extends Struct.ComponentSchema {
  collectionName: 'section_verticals';
  info: {
    displayName: 'Vertical';
    icon: 'align-left';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    button2: Schema.Attribute.Component<'shared.button', false>;
    content: Schema.Attribute.RichText;
    contentAlign: Schema.Attribute.Enumeration<['left', 'right', 'center']>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    video: Schema.Attribute.Component<'shared.video', false>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'shared_button';
  info: {
    displayName: 'Button';
    icon: 'button';
  };
  attributes: {
    blank: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    colorScheme: Schema.Attribute.Enumeration<
      ['default', 'black', 'white', 'red', 'green', 'blue']
    >;
    size: Schema.Attribute.Enumeration<['xs', 'sm', 'md', 'lg', 'xl']>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['solid', 'link', 'outline']>;
    url: Schema.Attribute.String;
  };
}

export interface SharedGridItem extends Struct.ComponentSchema {
  collectionName: 'shared_grid_item';
  info: {
    displayName: 'Grid Item';
    icon: 'apps';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'right', 'center']>;
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    icon: Schema.Attribute.Component<'shared.icon', false>;
    image: Schema.Attribute.Media<'images'>;
    mediaPosition: Schema.Attribute.Enumeration<
      ['top', 'right', 'bottom', 'left']
    >;
    tagline: Schema.Attribute.String;
    video: Schema.Attribute.Component<'shared.video', false>;
  };
}

export interface SharedIcon extends Struct.ComponentSchema {
  collectionName: 'shared_icon';
  info: {
    displayName: 'Icon';
    icon: 'star';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['none', 'c-1', 'c-2', 'c-3', 'c-4']>;
    icon: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::strapi-lucide-icons.icon'>;
    size: Schema.Attribute.Enumeration<['xs', 'sm', 'md', 'lg', 'xl']>;
  };
}

export interface SharedLogo extends Struct.ComponentSchema {
  collectionName: 'shared_logo';
  info: {
    displayName: 'Logo';
    icon: 'image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedOffice extends Struct.ComponentSchema {
  collectionName: 'shared_office';
  info: {
    displayName: 'Office';
    icon: 'building';
  };
  attributes: {
    addressLine: Schema.Attribute.String & Schema.Attribute.Required;
    city: Schema.Attribute.String & Schema.Attribute.Required;
    country: Schema.Attribute.String & Schema.Attribute.Required;
    lat: Schema.Attribute.Decimal & Schema.Attribute.Required;
    lng: Schema.Attribute.Decimal & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'shared_seo';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlide extends Struct.ComponentSchema {
  collectionName: 'shared_slide';
  info: {
    displayName: 'Slide';
    icon: 'picture';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    button2: Schema.Attribute.Component<'shared.button', false>;
    content: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    video: Schema.Attribute.Component<'shared.video', false>;
  };
}

export interface SharedVideo extends Struct.ComponentSchema {
  collectionName: 'shared_video';
  info: {
    displayName: 'Video';
    icon: 'play';
  };
  attributes: {
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    file: Schema.Attribute.Media<'files' | 'videos'>;
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'page.section': PageSection;
      'section.grid': SectionGrid;
      'section.hero': SectionHero;
      'section.horizontal': SectionHorizontal;
      'section.logos': SectionLogos;
      'section.news-section': SectionNewsSection;
      'section.offices': SectionOffices;
      'section.vertical': SectionVertical;
      'shared.button': SharedButton;
      'shared.grid-item': SharedGridItem;
      'shared.icon': SharedIcon;
      'shared.logo': SharedLogo;
      'shared.office': SharedOffice;
      'shared.seo': SharedSeo;
      'shared.slide': SharedSlide;
      'shared.video': SharedVideo;
    }
  }
}
