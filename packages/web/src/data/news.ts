import catBathtubs from "@/assets/cat-bathtubs.jpg";
import catFaucets from "@/assets/cat-faucets.jpg";
import catShowers from "@/assets/cat-showers.jpg";
import catToilets from "@/assets/cat-toilets.jpg";
import projectHotel from "@/assets/project-hotel.jpg";

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  image: string;
  imageAlt: string;
  category?: string;
  featured?: boolean;
}

const posts: NewsPost[] = [
  {
    id: "news-01",
    slug: "aquahaus-expands-warehouse-capacity",
    title: "AquaHaus expands warehouse capacity for faster regional delivery",
    excerpt:
      "We completed a warehouse expansion focused on faster lead times and more stable inventory for our partner showrooms.",
    content: [
      "AquaHaus has finalized an expansion of its regional warehouse operations to support growing demand from partner showrooms and installers.",
      "The expansion adds new storage zones for high-turnover bathroom fittings and improves internal picking workflows. This allows our logistics team to ship recurring orders with shorter processing windows.",
      "In practice, partners can expect better product availability, reduced stock gaps for core lines, and more predictable delivery schedules across key markets.",
    ],
    date: "2026-02-20",
    image: projectHotel,
    imageAlt: "Warehouse and distribution operations overview",
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
    image: catFaucets,
    imageAlt: "Premium faucet products on display",
    category: "Products",
  },
  {
    id: "news-03",
    slug: "design-partner-program-launch",
    title: "AquaHaus launches design partner program",
    excerpt:
      "Architects and interior studios can now join our new partner framework with technical consulting and project support.",
    content: [
      "The new design partner program was created for architectural and interior design teams working on medium and large-scale bathroom projects.",
      "Members get early product previews, direct technical support, and structured assistance during specification and procurement stages.",
      "The program is now open in selected regions, with broader rollout planned through the rest of the year.",
    ],
    date: "2026-02-05",
    image: catShowers,
    imageAlt: "Design partner collaboration and consultation",
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
    image: catToilets,
    imageAlt: "Showroom product training session",
    category: "Events",
  },
  {
    id: "news-05",
    slug: "case-study-urban-hotel-renovation",
    title: "Case study: Urban hotel renovation delivered on schedule",
    excerpt:
      "A recent hospitality renovation used AquaHaus systems across 180 rooms, balancing timeline pressure and quality requirements.",
    content: [
      "A multi-phase hotel renovation project in Central Europe reached completion on schedule, with AquaHaus products integrated across guest bathrooms and wellness areas.",
      "The project team prioritized consistent finish quality, straightforward maintenance, and coordinated deliveries across staggered installation phases.",
      "Detailed outcomes from the project will be published in an extended technical case study this quarter.",
    ],
    date: "2026-01-16",
    image: catBathtubs,
    imageAlt: "Hotel bathroom renovation case study",
    category: "Projects",
  },
];

function byNewest(a: NewsPost, b: NewsPost) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllNews() {
  // oxlint-disable-next-line unicorn/no-array-sort
  return [...posts].sort(byNewest);
}

export function getLatestNews(limit: number) {
  return getAllNews().slice(0, limit);
}

export function getNewsBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
