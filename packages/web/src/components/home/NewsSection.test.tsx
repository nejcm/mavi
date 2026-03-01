import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import NewsSection from "@/components/home/NewsSection";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

describe("NewsSection", () => {
  it("renders latest three posts", () => {
    render(<NewsSection />);
    expect(screen.getAllByText("home.news.readMore")).toHaveLength(3);
  });

  it("includes a link to the full news page", () => {
    render(<NewsSection />);
    expect(screen.getByRole("link", { name: "home.news.viewAll" })).toHaveAttribute(
      "href",
      "/news",
    );
  });
});
