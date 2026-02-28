import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import catSinks from "@/assets/cat-sinks.jpg";
import catFaucets from "@/assets/cat-faucets.jpg";
import catShowers from "@/assets/cat-showers.jpg";
import catBathtubs from "@/assets/cat-bathtubs.jpg";
import catToilets from "@/assets/cat-toilets.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";

const categories = [
  { title: "Sinks & Basins", image: catSinks },
  { title: "Faucets & Mixers", image: catFaucets },
  { title: "Showers & Systems", image: catShowers },
  { title: "Bathtubs", image: catBathtubs },
  { title: "Toilets", image: catToilets },
  { title: "Accessories", image: catAccessories },
];

const ProductCategories = () => {
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
            Our Collections
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Product Categories</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-card cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-500"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex items-center justify-between">
                <h3 className="font-display text-lg text-foreground">{cat.title}</h3>
                <span className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-body">
                  View Collection
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
