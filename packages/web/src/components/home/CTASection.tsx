import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/ContactForm";

const CTASection = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            {t("cta.letsWorkTogether")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
            {t("cta.partnerWithUs")}
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-10">
            Access premium bathroom products at wholesale scale. Whether you're furnishing a single
            project or managing ongoing supply, we're ready to support your business.
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg">
                {t("cta.getInTouch")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("cta.getInTouch")}</DialogTitle>
              </DialogHeader>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
