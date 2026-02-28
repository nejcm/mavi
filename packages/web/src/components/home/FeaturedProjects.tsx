import { motion } from "framer-motion";

import projectHotel from "@/assets/project-hotel.jpg";
import projectResidential from "@/assets/project-residential.jpg";
import projectSpa from "@/assets/project-spa.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";

const projects = [
  { title: "Luxury Hotel Project", location: "Dubai, UAE", image: projectHotel },
  { title: "Residential Development", location: "London, UK", image: projectResidential },
  { title: "Wellness Spa Resort", location: "Bali, Indonesia", image: projectSpa },
  { title: "Commercial Office Tower", location: "New York, USA", image: projectCommercial },
];

const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-warm-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            Portfolio
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Featured Projects</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-display text-xl text-primary-foreground">{p.title}</h3>
                <p className="text-sm text-primary-foreground/70 font-body mt-1">{p.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
