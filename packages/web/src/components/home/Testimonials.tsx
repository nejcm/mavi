import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "AquaHaus has been our go-to wholesale partner for three years. Their product quality and reliability are unmatched in the industry.",
    name: "Sarah Mitchell",
    title: "Head of Procurement",
    company: "Sterling Developments Ltd.",
  },
  {
    quote:
      "The dedicated account management and fast turnaround on custom orders make them invaluable for our high-end hospitality projects.",
    name: "James Chen",
    title: "Principal Architect",
    company: "Chen & Associates",
  },
  {
    quote:
      "Consistent quality, competitive pricing, and a catalog that covers everything we need. A true one-stop wholesale solution.",
    name: "Maria Rodriguez",
    title: "Design Director",
    company: "Luxe Interiors Group",
  },
];

const Testimonials = () => {
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
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            What Our Partners Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-8 rounded-lg border border-border"
            >
              <Quote size={24} strokeWidth={1} className="text-muted-foreground/40 mb-6" />
              <p className="text-muted-foreground leading-relaxed font-body mb-8 text-sm">
                "{t.quote}"
              </p>
              <div>
                <p className="font-display text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground font-body mt-1">{t.title}</p>
                <p className="text-xs text-muted-foreground font-body">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
