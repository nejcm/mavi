import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

const testimonials = [{ key: "sarahMitchell" }, { key: "jamesChen" }, { key: "mariaRodriguez" }];

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            {t("home.testimonials.eyebrow")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            {t("home.testimonials.heading")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => {
            const quote = t(`home.testimonials.items.${item.key}.quote`);
            const name = t(`home.testimonials.items.${item.key}.name`);
            const title = t(`home.testimonials.items.${item.key}.title`);
            const company = t(`home.testimonials.items.${item.key}.company`);

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-8 rounded-lg border border-border"
              >
                <Quote size={24} strokeWidth={1} className="text-muted-foreground/40 mb-6" />
                <p className="text-muted-foreground leading-relaxed font-body mb-8 text-sm">
                  “{quote}”
                </p>
                <div>
                  <p className="font-display text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">{title}</p>
                  <p className="text-xs text-muted-foreground font-body">{company}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
