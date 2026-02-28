import { createFileRoute } from "@tanstack/react-router";

import AboutSection from "../components/home/AboutSection";
import CTASection from "../components/home/CTASection";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import HeroSection from "../components/home/HeroSection";
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
      <Header />
      <HeroSection />
      <AboutSection />
      <ProductCategories />
      <WhyChooseUs />
      <FeaturedProjects />
      <NewsSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
