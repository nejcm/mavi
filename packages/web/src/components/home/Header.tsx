import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { IMAGES_BASE_PATH } from "@/constants/config";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type NavLink = {
  key: string;
  href?: string;
  to?: string;
};

const navLinks: NavLink[] = [
  { key: "about", href: "/#about" },
  { key: "products", href: "/#products" },
  { key: "whyUs", href: "/#why-us" },
  { key: "projects", href: "/#projects" },
  { key: "news", href: "/#news" },
  { key: "contact", href: "/#contact" },
];

export interface HeaderProps {
  isDark?: boolean;
}

const Header = ({ isDark }: HeaderProps) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6">
      <div
        className={`mx-auto flex h-16 items-center justify-between px-6 transition-all duration-500 ${
          scrolled
            ? "max-w-5xl rounded-full border-none bg-background/50 text-foreground shadow-sm backdrop-blur-sm"
            : `max-w-7xl bg-transparent ${isDark ? "text-white" : "text-foreground"}`
        }`}
      >
        <a href="/" className="flex items-center gap-3">
          <img src={`${IMAGES_BASE_PATH}/mavi_logo.png`} alt="Mavi d.o.o." className="h-8 w-auto" />
          <span className="sr-only">Mavi d.o.o.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.key}
                to={link.to as any}
                className={`text-sm tracking-wider uppercase ${scrolled || !isDark ? "hover:text-black" : "hover:text-gray-200"} transition-background duration-300`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ) : (
              <a
                key={link.key}
                href={link.href}
                className={`text-sm tracking-wider uppercase ${scrolled || !isDark ? "hover:text-black" : "hover:text-gray-200"} transition-background duration-300`}
              >
                {t(`nav.${link.key}`)}
              </a>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LocaleSwitcher scrolled={scrolled} />
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t("common.toggleMenu")}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className={`mx-auto mt-2 max-w-5xl rounded-3xl border-none bg-background/90 text-foreground backdrop-blur-xl animate-fade-in md:hidden ${
            scrolled ? "shadow-lg" : "shadow-md"
          }`}
        >
          <nav className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.key}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm tracking-wider uppercase ${scrolled || !isDark ? "hover:text-black" : "hover:text-gray-200"} py-2`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ) : (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm tracking-wider uppercase ${scrolled || !isDark ? "hover:text-black" : "hover:text-gray-200"} py-2`}
                >
                  {t(`nav.${link.key}`)}
                </a>
              ),
            )}
            <div className="mt-4 flex flex-col gap-2">
              <LocaleSwitcher scrolled={scrolled} isDark={isDark} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
