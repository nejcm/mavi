import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import { useTranslation } from "react-i18next";

import heroImage from "@/assets/hero-bathroom.jpg";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type SliderItem = {
  image: string;
  eyebrowKey?: string;
  headingKey?: string;
  subheadingKey?: string;
  primaryCtaKey?: string;
  secondaryCtaKey?: string;
};

const sliderItems: SliderItem[] = [
  {
    image: heroImage,
    eyebrowKey: "home.hero.eyebrow",
    headingKey: "home.hero.heading",
    subheadingKey: "home.hero.subheading",
    primaryCtaKey: "home.hero.primaryCta",
    secondaryCtaKey: "home.hero.secondaryCta",
  },
  {
    image: heroImage,
    subheadingKey: "home.hero.subheading",
    primaryCtaKey: "home.hero.primaryCta",
  },
  {
    image: heroImage,
    headingKey: "home.hero.heading",
  },
];

const plugins = [
  Autoplay({
    delay: 28_000,
  }),
  ClassNames(),
];

const opts = {
  loop: true,
};

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <Carousel className="absolute inset-0 z-10" opts={opts} plugins={plugins}>
        <CarouselContent className="h-full">
          {sliderItems.map((item, index) => (
            <CarouselItem key={index} className="relative h-full px-0">
              <img
                src={item.image}
                alt={t("home.hero.imageAlt")}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-foreground/30" />
              <div className="absolute inset-0 p-4 md:p-6 lg:p-8 z-10 flex items-center justify-center">
                <div className="container mx-auto px-6 text-center">
                  {item.eyebrowKey && (
                    <p className="hero-animate-eyebrow text-sm tracking-[0.3em] uppercase text-primary-foreground/80 mb-6 font-body">
                      {t(item.eyebrowKey)}
                    </p>
                  )}
                  {item.headingKey && (
                    <h1 className="hero-animate-heading font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight max-w-4xl mx-auto">
                      {t(item.headingKey)}
                    </h1>
                  )}
                  {item.subheadingKey && (
                    <p className="hero-animate-subheading mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto font-body font-light">
                      {t(item.subheadingKey)}
                    </p>
                  )}
                  {(item.primaryCtaKey || item.secondaryCtaKey) && (
                    <div className="hero-animate-ctas mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                      {item.primaryCtaKey && (
                        <Button
                          variant="hero"
                          size="lg"
                          className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                        >
                          {t(item.primaryCtaKey)}
                        </Button>
                      )}
                      {item.secondaryCtaKey && (
                        <Button
                          variant="hero-outline"
                          size="lg"
                          className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                        >
                          {t(item.secondaryCtaKey)}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 top-1/2 -translate-y-1/2 border-primary-foreground/40 bg-background/10 text-primary-foreground hover:bg-background/30" />
        <CarouselNext className="right-6 top-1/2 -translate-y-1/2 border-primary-foreground/40 bg-background/10 text-primary-foreground hover:bg-background/30" />
      </Carousel>
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-primary-foreground/40 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
