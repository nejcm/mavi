import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Products" },
  { value: "200+", label: "Business Partners" },
  { value: "10+", label: "Years Experience" },
];

const AboutSection = () => {
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
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-8">
              Trusted Source for Premium Bathroom Products
            </h2>
            <div className="space-y-5 text-muted-foreground font-body leading-relaxed">
              <p>
                For over a decade, Mavi has been the trusted wholesale partner for architects,
                designers, and developers seeking premium bathroom solutions. We source the finest
                fixtures and fittings from world-renowned manufacturers.
              </p>
              <p>
                Our commitment to quality extends beyond products — with dedicated account managers,
                reliable logistics, and one of the largest inventories in the industry, we ensure
                your projects are delivered on time and to specification.
              </p>
              <p>
                From boutique residential developments to large-scale hospitality projects, our team
                provides tailored solutions that meet the highest standards of design and
                functionality.
              </p>
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
                key={stat.label}
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
                  {stat.label}
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
