import { motion } from "framer-motion";
import { DollarSign, Globe, Settings, ShieldCheck, Truck, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [
  { icon: DollarSign, key: "bulkPricing" },
  { icon: Truck, key: "fastDelivery" },
  { icon: ShieldCheck, key: "qualityControl" },
  { icon: Users, key: "accountManagers" },
  { icon: Globe, key: "globalSourcing" },
  { icon: Settings, key: "customOrders" },
];

const WhyChooseUs = () => {
  const { t } = useTranslation();

  return (
    <section id="why-us" className="py-24 md:py-32 bg-warm-bg/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            {t("home.why.eyebrow")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            {t("home.why.heading")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-lg border border-border hover:border-foreground/20 transition-colors duration-300"
            >
              <f.icon size={28} strokeWidth={1.5} className="text-foreground mb-5" />
              <h3 className="font-display text-lg text-foreground mb-3">
                {t(`home.why.features.${f.key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">
                {t(`home.why.features.${f.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
