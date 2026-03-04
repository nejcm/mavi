import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const stats = [
  { value: "500+", key: "products" },
  { value: "200+", key: "partners" },
  { value: "10+", key: "experience" },
];

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
              {t("home.about.eyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-8">
              {t("home.about.heading")}
            </h2>
            <div className="space-y-5 text-muted-foreground font-body leading-relaxed">
              <p>{t("home.about.body1")}</p>
              <p>{t("home.about.body2")}</p>
              <p>{t("home.about.body3")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="text-center p-6 rounded-lg bg-secondary"
              >
                <p className="font-display text-3xl md:text-4xl text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground tracking-wide uppercase font-body">
                  {t(`home.about.stats.${stat.key}`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
