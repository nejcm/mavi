import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "react-i18next";

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

const CompanyLogos = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 2200);

    return () => window.clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section id="partners" className="bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted-foreground font-body">
            {t("home.logos.eyebrow")}
          </p>
          <h2 className="font-display text-2xl text-foreground md:text-3xl">
            {t("home.logos.heading")}
          </h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {[...logoNames, ...logoNames].map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="min-w-0 flex-[0_0_50%] px-3 sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%]"
              >
                <div className="flex h-20 items-center justify-center rounded-xl border border-border/70 bg-background px-4 text-center">
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
