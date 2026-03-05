import { createFileRoute } from "@tanstack/react-router";

import AboutSection from "../components/home/AboutSection";
import CompanyLogos from "../components/home/CompanyLogos";
import ContactSection from "../components/home/ContactSection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import HeroSection from "../components/home/HeroSection";
import HighlightsSection from "../components/home/HighlightsSection";
import NewsSection from "../components/home/NewsSection";
import ProductCategories from "../components/home/ProductCategories";
import Testimonials from "../components/home/Testimonials";
import WhyChooseUs from "../components/home/WhyChooseUs";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <main>
      <Header isDark />
      <HeroSection />
      <CompanyLogos />
      <AboutSection />
      <WhyChooseUs />
      <ProductCategories />
      <HighlightsSection />
      <FeaturedProjects />
      <Testimonials />
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
