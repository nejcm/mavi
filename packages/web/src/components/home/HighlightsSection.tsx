import { useTranslation } from "react-i18next";

const baseKey = "home.highlights.items";

const highlights = [
  {
    id: "dornbracht",
    titleKey: `${baseKey}.dornbracht.title`,
    bodyKey: `${baseKey}.dornbracht.body`,
    imageSrc: "https://mavi.si/res_mavi/img/Dornbracht.jpg",
  },
  {
    id: "heatPumps",
    titleKey: `${baseKey}.heatPumps.title`,
    bodyKey: `${baseKey}.heatPumps.body`,
    imageSrc: "https://mavi.si/res_mavi/img/Ferroli.jpg",
  },
  {
    id: "visoft",
    titleKey: `${baseKey}.visoft.title`,
    bodyKey: `${baseKey}.visoft.body`,
    imageSrc: "https://mavi.si/res_mavi/img/Visoft.jpg",
  },
] as const;

const HighlightsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="highlights" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            {t("home.highlights.eyebrow")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            {t("home.highlights.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground font-body">
            {t("home.highlights.subheading")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="relative overflow-hidden rounded-lg border border-border/80 bg-muted/40">
                <img
                  src={item.imageSrc}
                  alt={t(item.titleKey)}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-xl text-foreground">{t(item.titleKey)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground font-body">
                {t(item.bodyKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
