import { motion } from "framer-motion";
import { Bath, Flame, Grid3X3, Pipette, Wind } from "lucide-react";
import { useTranslation } from "react-i18next";

import catAccessories from "@/assets/cat-accessories.jpg";
import catBathtubs from "@/assets/cat-bathtubs.jpg";
import catFaucets from "@/assets/cat-faucets.jpg";
import catShowers from "@/assets/cat-showers.jpg";
import catSinks from "@/assets/cat-sinks.jpg";

const baseKey = "home.productCategories.categories";

const categories = [
  {
    id: "waterworks",
    icon: Pipette,
    image: catFaucets,
    titleKey: `${baseKey}.waterworks.title`,
    subcategoryKeys: [
      `${baseKey}.waterworks.items.installationMaterial`,
      `${baseKey}.waterworks.items.insulation`,
      `${baseKey}.waterworks.items.valves`,
      `${baseKey}.waterworks.items.siphons`,
      `${baseKey}.waterworks.items.filters`,
    ],
  },
  {
    id: "sanitaryEquipment",
    icon: Bath,
    image: catBathtubs,
    titleKey: `${baseKey}.sanitaryEquipment.title`,
    subcategoryKeys: [
      `${baseKey}.sanitaryEquipment.items.sanitaryCeramics`,
      `${baseKey}.sanitaryEquipment.items.sanitaryFaucets`,
      `${baseKey}.sanitaryEquipment.items.bathtubsAndShowerTrays`,
      `${baseKey}.sanitaryEquipment.items.showerCabinsAndScreens`,
      `${baseKey}.sanitaryEquipment.items.massageSystems`,
      `${baseKey}.sanitaryEquipment.items.bathroomFurniture`,
      `${baseKey}.sanitaryEquipment.items.bathroomAccessories`,
    ],
  },
  {
    id: "heating",
    icon: Flame,
    image: catAccessories,
    titleKey: `${baseKey}.heating.title`,
    subcategoryKeys: [
      `${baseKey}.heating.items.heatingBoilers`,
      `${baseKey}.heating.items.electricFurnaces`,
      `${baseKey}.heating.items.burners`,
      `${baseKey}.heating.items.heatPumps`,
      `${baseKey}.heating.items.fireplaces`,
      `${baseKey}.heating.items.controls`,
      `${baseKey}.heating.items.classicRadiators`,
      `${baseKey}.heating.items.bathroomRadiators`,
      `${baseKey}.heating.items.electricRadiators`,
      `${baseKey}.heating.items.floorHeating`,
      `${baseKey}.heating.items.waterHeaters`,
      `${baseKey}.heating.items.oilTanks`,
      `${baseKey}.heating.items.pumpsAndMixingValves`,
      `${baseKey}.heating.items.chimneySystems`,
      `${baseKey}.heating.items.solarSystems`,
      `${baseKey}.heating.items.radiatorValvesAndManifolds`,
      `${baseKey}.heating.items.insulation`,
    ],
  },
  {
    id: "ceramicTiles",
    icon: Grid3X3,
    image: catSinks,
    titleKey: `${baseKey}.ceramicTiles.title`,
    subcategoryKeys: [
      `${baseKey}.ceramicTiles.items.ceramicTiles`,
      `${baseKey}.ceramicTiles.items.adhesivesGroutsAndSilicones`,
      `${baseKey}.ceramicTiles.items.trims`,
    ],
  },
  {
    id: "ventilation",
    icon: Wind,
    image: catShowers,
    titleKey: `${baseKey}.ventilation.title`,
    subcategoryKeys: [
      `${baseKey}.ventilation.items.airConditioningUnits`,
      `${baseKey}.ventilation.items.ventilationDevices`,
    ],
  },
] as const;

const ProductCategories = () => {
  const { t } = useTranslation();

  return (
    <section id="products" className="py-24 md:py-32 bg-warm-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            {t("home.productCategories.eyebrow")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            {t("home.productCategories.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground font-body">
            {t("home.productCategories.subheading")}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-foreground/20"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={cat.image}
                  alt={t(cat.titleKey)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/40 to-transparent p-5">
                  <div className="flex items-center gap-3">
                    <cat.icon size={24} strokeWidth={1.8} className="text-white" />
                    <h3 className="font-display text-xl text-white">{t(cat.titleKey)}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-muted-foreground font-body">
                  {cat.subcategoryKeys.map((subcategoryKey) => t(subcategoryKey)).join(", ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
