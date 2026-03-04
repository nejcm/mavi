import { useTranslation } from "react-i18next";

import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-display text-xl mb-4">MAVI</h3>
            <p className="text-sm text-primary-foreground/60 font-body leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4 font-body font-semibold">
              {t("footer.contactHeading")}
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/60 font-body">
              <p>{t("footer.email")}</p>
              <p>{t("footer.phone")}</p>
              <p>
                {t("footer.addressLine1")}
                <br />
                {t("footer.addressLine2")}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4 font-body font-semibold">
              {t("footer.businessHoursHeading")}
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/60 font-body">
              <p>{t("footer.hoursWeekday")}</p>
              <p>{t("footer.hoursSaturday")}</p>
              <p>{t("footer.hoursSunday")}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm tracking-wider uppercase mb-4 font-body font-semibold">
              {t("footer.followUsHeading")}
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/60 font-body">
              <a href="#" className="block hover:text-primary-foreground transition-colors">
                {t("footer.socialLinkedIn")}
              </a>
              <a href="#" className="block hover:text-primary-foreground transition-colors">
                {t("footer.socialInstagram")}
              </a>
              <a href="#" className="block hover:text-primary-foreground transition-colors">
                {t("footer.socialPinterest")}
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/10 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/40 font-body">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-foreground/70 transition-colors">
              {t("footer.privacyPolicy")}
            </a>
            <a href="#" className="hover:text-primary-foreground/70 transition-colors">
              {t("footer.termsOfService")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
