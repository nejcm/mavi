import { motion } from "framer-motion";
import { DollarSign, Truck, ShieldCheck, Users, Globe, Settings } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Bulk Pricing",
    desc: "Competitive wholesale rates with volume-based discounts for all partners.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Reliable logistics with expedited shipping options across all regions.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Control",
    desc: "Every product passes rigorous inspection before leaving our warehouse.",
  },
  {
    icon: Users,
    title: "Account Managers",
    desc: "Dedicated support to handle your orders, specifications, and timelines.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    desc: "Partnerships with leading manufacturers from Europe, Asia, and beyond.",
  },
  {
    icon: Settings,
    title: "Custom Orders",
    desc: "Tailored solutions for unique project requirements and specifications.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            Our Advantages
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Why Choose Us</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-lg border border-border hover:border-foreground/20 transition-colors duration-300"
            >
              <f.icon size={28} strokeWidth={1.5} className="text-foreground mb-5" />
              <h3 className="font-display text-lg text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
