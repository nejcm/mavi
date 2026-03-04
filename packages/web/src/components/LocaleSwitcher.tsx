import { LanguagesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Locale } from "@/i18n";
import { useAppStore } from "@/stores/app-store";

export interface LocaleSwitcherProps {
  scrolled: boolean;
  isDark?: boolean;
}

const locales: { value: Locale; labelKey: string; flagSrc: string }[] = [
  {
    value: "en",
    labelKey: "locale.languageEnglish",
    flagSrc: "/images/flags/gb.svg",
  },
  {
    value: "sl",
    labelKey: "locale.languageSlovenian",
    flagSrc: "/images/flags/si.svg",
  },
  {
    value: "hr",
    labelKey: "locale.languageCroatian",
    flagSrc: "/images/flags/hr.svg",
  },
];

export function LocaleSwitcher({ scrolled, isDark }: LocaleSwitcherProps) {
  const { t, i18n } = useTranslation();
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  const handleChange = (next: Locale) => {
    setLocale(next);
    i18n.changeLanguage(next);
  };

  const currentLocale = locales.find((l) => l.value === locale);
  const currentLabel = currentLocale ? t(currentLocale.labelKey) : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="unstyled"
          size="icon"
          className={`${scrolled || !isDark ? "hover:text-black" : "hover:text-gray-200"} text-inherit`}
          aria-label={
            currentLocale
              ? t("locale.ariaCurrentLanguage", { language: currentLabel })
              : t("locale.ariaChangeLanguage")
          }
        >
          <LanguagesIcon size={20} />
          <span className="leading-none capitalize" aria-hidden>
            {currentLocale?.value ?? "si"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map(({ value, labelKey, flagSrc }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleChange(value)}
            className="gap-2 cursor-pointer"
          >
            <img
              src={flagSrc}
              alt=""
              className="h-5 w-5 rounded-sm object-cover shrink-0"
              aria-hidden
            />
            <span>{t(labelKey)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
