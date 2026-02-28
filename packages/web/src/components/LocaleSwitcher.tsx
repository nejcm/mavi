import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore, type Locale } from "@/stores/app-store";
import { LanguagesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface LocaleSwitcherProps {
  scrolled: boolean;
}

const locales: { value: Locale; label: string; flagSrc: string }[] = [
  { value: "en", label: "English", flagSrc: "/images/flags/gb.svg" },
  { value: "sl", label: "Slovenščina", flagSrc: "/images/flags/si.svg" },
];

export function LocaleSwitcher({ scrolled }: LocaleSwitcherProps) {
  const { i18n } = useTranslation();
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  const handleChange = (next: Locale) => {
    setLocale(next);
    i18n.changeLanguage(next);
  };

  const currentLocale = locales.find((l) => l.value === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="unstyled"
          size="icon"
          className={`${scrolled ? "hover:text-black" : "hover:text-gray-200"} text-inherit`}
          aria-label={
            currentLocale
              ? `Language: ${currentLocale.label}`
              : "Change language"
          }
        >
          <LanguagesIcon size={20} />
          <span className="leading-none capitalize" aria-hidden>
            {currentLocale?.value ?? "si"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map(({ value, label, flagSrc }) => (
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
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
