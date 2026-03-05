"use strict";

const fs = require("fs-extra");
const path = require("path");
const mime = require("mime-types");

// Reuse frontend copy for labels/headings
// eslint-disable-next-line import/no-unresolved
const en = require("../../web/src/locales/en.json");

// Offices (mirrors packages/web/src/data/offices.ts)
const officeLocations = [
  {
    id: "maribor",
    name: "Poslovna enota Maribor",
    addressLine: "Novakova ulica 8",
    city: "Maribor",
    country: "Slovenija",
    lat: 46.5596,
    lng: 15.6459,
  },
  {
    id: "ljubljana-vic",
    name: "Poslovna enota Ljubljana - Vič",
    addressLine: "Cesta v Mestni log 86",
    city: "Ljubljana",
    country: "Slovenija",
    lat: 46.0406,
    lng: 14.4871,
  },
  {
    id: "ljubljana-bezigrad",
    name: "Poslovna enota Ljubljana - Bežigrad",
    addressLine: "Slovenčeva ulica 97",
    city: "Ljubljana",
    country: "Slovenija",
    lat: 46.0839,
    lng: 14.511,
  },
  {
    id: "celje",
    name: "Poslovna enota Celje",
    addressLine: "Podjavorškova ulica 2",
    city: "Celje",
    country: "Slovenija",
    lat: 46.2397,
    lng: 15.2677,
  },
  {
    id: "novo-mesto",
    name: "Poslovna enota Novo mesto",
    addressLine: "Medičeva ulica 15",
    city: "Novo mesto",
    country: "Slovenija",
    lat: 45.8016,
    lng: 15.1618,
  },
  {
    id: "murska-sobota",
    name: "Poslovna enota Murska Sobota",
    addressLine: "Obrtna ulica 42",
    city: "Murska Sobota",
    country: "Slovenija",
    lat: 46.6645,
    lng: 16.1716,
  },
  {
    id: "koper",
    name: "Poslovna enota Koper",
    addressLine: "Sermin 71i",
    city: "Koper",
    country: "Slovenija",
    lat: 45.5519,
    lng: 13.7306,
  },
  {
    id: "slovenska-bistrica",
    name: "Poslovna enota Slovenska Bistrica",
    addressLine: "Stepišnikova ulica 12a",
    city: "Slovenska Bistrica",
    country: "Slovenija",
    lat: 46.3928,
    lng: 15.5735,
  },
  {
    id: "ptuj",
    name: "Poslovna enota Ptuj",
    addressLine: "Ob Dravi 3a",
    city: "Ptuj",
    country: "Slovenija",
    lat: 46.4201,
    lng: 15.8702,
  },
];

// News posts (mirrors packages/web/src/data/news.ts, without image imports)
const newsPosts = [
  {
    id: "news-01",
    slug: "mavi-expands-warehouse-capacity",
    title: "Mavi expands warehouse capacity for faster regional delivery",
    excerpt:
      "We completed a warehouse expansion focused on faster lead times and more stable inventory for our partner showrooms.",
    content: [
      "Mavi has finalized an expansion of its regional warehouse operations to support growing demand from partner showrooms and installers.",
      "The expansion adds new storage zones for high-turnover bathroom fittings and improves internal picking workflows. This allows our logistics team to ship recurring orders with shorter processing windows.",
      "In practice, partners can expect better product availability, reduced stock gaps for core lines, and more predictable delivery schedules across key markets.",
    ],
    date: "2026-02-20",
    category: "Operations",
    featured: true,
  },
  {
    id: "news-02",
    slug: "new-sustainable-product-lines",
    title: "New sustainable product lines arrive this spring",
    excerpt:
      "A new product wave introduces lower-consumption faucets and shower systems designed for commercial and residential projects.",
    content: [
      "This spring collection introduces a curated selection of low-flow faucets, dual-flush systems, and shower components designed around long-term durability.",
      "The products are aimed at projects that need measurable water-efficiency improvements without compromising comfort or visual quality.",
      "Technical data sheets and availability timelines are now ready for specification teams and can be requested through your account manager.",
    ],
    date: "2026-02-14",
    category: "Products",
  },
  {
    id: "news-03",
    slug: "design-partner-program-launch",
    title: "Mavi launches design partner program",
    excerpt:
      "Architects and interior studios can now join our new partner framework with technical consulting and project support.",
    content: [
      "The new design partner program was created for architectural and interior design teams working on medium and large-scale bathroom projects.",
      "Members get early product previews, direct technical support, and structured assistance during specification and procurement stages.",
      "The program is now open in selected regions, with broader rollout planned through the rest of the year.",
    ],
    date: "2026-02-05",
    category: "Partnerships",
  },
  {
    id: "news-04",
    slug: "showroom-training-series-2026",
    title: "2026 showroom training series opens for registration",
    excerpt:
      "Our annual product and sales training program starts in March with focused sessions for retail and technical teams.",
    content: [
      "Registration is now open for the 2026 showroom training series, a practical program designed for front-of-house and technical sales teams.",
      "Sessions cover product positioning, installation prerequisites, and cross-category recommendations for premium bathroom projects.",
      "Each training day includes live demonstrations and Q&A with product specialists.",
    ],
    date: "2026-01-28",
    category: "Events",
  },
  {
    id: "news-05",
    slug: "case-study-urban-hotel-renovation",
    title: "Case study: Urban hotel renovation delivered on schedule",
    excerpt:
      "A recent hospitality renovation used Mavi systems across 180 rooms, balancing timeline pressure and quality requirements.",
    content: [
      "A multi-phase hotel renovation project in Central Europe reached completion on schedule, with Mavi products integrated across guest bathrooms and wellness areas.",
      "The project team prioritized consistent finish quality, straightforward maintenance, and coordinated deliveries across staggered installation phases.",
      "Detailed outcomes from the project will be published in an extended technical case study this quarter.",
    ],
    date: "2026-01-16",
    category: "Projects",
  },
];

// Logos (mirrors logoNames in CompanyLogos.tsx)
const logoNames = [
  "Nordic Build",
  "Urban Forma",
  "Atlas Living",
  "Prime Habitat",
  "Linea Spaces",
  "Vista Construct",
  "Azure Estates",
  "Terra Design",
];

// Projects (mirrors keys in FeaturedProjects.tsx)
const projectKeys = [
  "luxuryHotel",
  "residentialDevelopment",
  "wellnessSpa",
  "officeTower",
  "retailCenter",
  "coastalVilla",
];

// --- File helpers (adapted from scripts/seed.js) ---

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

function getFileData(fileName) {
  const filePath = path.join("data", "uploads", fileName);
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split(".").pop();
  const mimeType = mime.lookup(ext || "") || "";

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(file, name) {
  return strapi
    .plugin("upload")
    .service("upload")
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: `An image uploaded to Strapi called ${name}`,
          caption: name,
          name,
        },
      },
    });
}

async function checkFileExistsBeforeUpload(files) {
  const existingFiles = [];
  const uploadedFiles = [];
  const filesCopy = [...files];

  for (const fileName of filesCopy) {
    const fileWhereName = await strapi.query("plugin::upload.file").findOne({
      where: {
        name: fileName.replace(/\..*$/, ""),
      },
    });

    if (fileWhereName) {
      existingFiles.push(fileWhereName);
    } else {
      const fileData = getFileData(fileName);
      const fileNameNoExtension = fileName.split(".").shift();
      const [file] = await uploadFile(fileData, fileNameNoExtension);
      uploadedFiles.push(file);
    }
  }

  const allFiles = [...existingFiles, ...uploadedFiles];
  return allFiles.length === 1 ? allFiles[0] : allFiles;
}

// --- Seed helpers ---

async function createDocument(uid, data) {
  try {
    await strapi.documents(uid).create({ data });
  } catch (error) {
    console.error(`Error creating document for ${uid}`, error);
  }
}

async function seedNews(defaultImage) {
  for (const post of newsPosts) {
    await createDocument("api::news.news", {
      language: "en",
      title: post.title,
      slug: post.slug,
      summary: post.excerpt,
      content: post.content.join("\n\n"),
      date: post.date,
      featured: Boolean(post.featured),
      image: defaultImage,
    });
  }
}

async function seedHeroSection() {
  const hero = en.home.hero;

  const slides = [
    {
      __component: "shared.slide",
      heading: hero.heading,
      content: hero.subheading,
      button: {
        __component: "shared.button",
        type: "solid",
        colorScheme: "white",
        size: "lg",
        text: hero.primaryCta,
      },
      button2: {
        __component: "shared.button",
        type: "outline",
        colorScheme: "white",
        size: "lg",
        text: hero.secondaryCta,
      },
    },
    {
      __component: "shared.slide",
      content: hero.subheading,
      button: {
        __component: "shared.button",
        type: "solid",
        colorScheme: "white",
        size: "lg",
        text: hero.primaryCta,
      },
    },
    {
      __component: "shared.slide",
      heading: hero.heading,
    },
  ];

  await createDocument("api::section.section", {
    name: "Home – Hero",
    type: "hero",
    blocks: [
      {
        __component: "section.hero",
        name: "Hero",
        slides,
      },
    ],
  });
}

async function seedOfficesSection() {
  const contact = en.contact;

  await createDocument("api::section.section", {
    name: "Home – Offices",
    type: "offices",
    blocks: [
      {
        __component: "section.offices",
        name: "Offices",
        tagline: contact.eyebrow,
        heading: contact.heading,
        subheading: contact.description,
        offices: officeLocations.map((o) => ({
          __component: "shared.office",
          name: o.name,
          addressLine: o.addressLine,
          city: o.city,
          country: o.country,
          lat: o.lat,
          lng: o.lng,
        })),
      },
    ],
  });
}

async function seedLogosSection(defaultImage) {
  const logosCopy = en.home.logos;

  await createDocument("api::section.section", {
    name: "Home – Logos",
    type: "logos",
    blocks: [
      {
        __component: "section.logos",
        name: "Logos",
        tagline: logosCopy.eyebrow,
        heading: logosCopy.heading,
        content: "",
        logos: logoNames.map((name) => ({
          __component: "shared.logo",
          name,
          image: defaultImage,
        })),
      },
    ],
  });
}

async function seedProjectsSection(defaultImage) {
  const projectsCopy = en.home.projects;

  const items = projectKeys.map((key) => {
    const item = projectsCopy.items[key];
    return {
      __component: "shared.grid-item",
      heading: item.title,
      tagline: item.location,
      content: "",
      image: defaultImage,
      mediaPosition: "top",
      align: "left",
    };
  });

  await createDocument("api::section.section", {
    name: "Home – Projects",
    type: "grid",
    blocks: [
      {
        __component: "section.grid",
        name: "Featured projects",
        tagline: projectsCopy.eyebrow,
        heading: projectsCopy.heading,
        content: "",
        perRow: 3,
        items,
      },
    ],
  });
}

async function seedMavi() {
  console.log("Seeding Mavi content (news, hero slides, offices, projects, logos)...");

  const defaultImage = await checkFileExistsBeforeUpload(["default-image.png"]);

  await seedNews(defaultImage);
  await seedHeroSection();
  await seedOfficesSection();
  await seedProjectsSection(defaultImage);
  await seedLogosSection(defaultImage);

  console.log("Mavi content seed finished.");
}

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = "error";

  try {
    await seedMavi();
  } catch (error) {
    console.error("Mavi seed failed", error);
    process.exitCode = 1;
  } finally {
    await app.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
