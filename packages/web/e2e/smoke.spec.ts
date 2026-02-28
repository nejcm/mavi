import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
  test("home page loads and shows main content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByText(/AQUA/i)).toBeVisible();
  });

  test("navigation to contact section works", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /get in touch/i })
      .first()
      .click();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("not-found route shows 404 and return home link", async ({ page }) => {
    await page.goto("/non-existent-page");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByRole("link", { name: /return to home/i })).toBeVisible();
  });
});
