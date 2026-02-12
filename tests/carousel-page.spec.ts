import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";

test.describe("carousel page", () => {
  test("carousel - carousel is visible", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await expect(homePage.carouselActiveImage).toBeVisible();
  });
  test("carousel next changes active slide", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    const activeSlide = page.locator(".carousel-item.active");
    const firstSlideContent = await activeSlide.innerHTML();

    await homePage.nextButton.click();
    await page.waitForTimeout(1000);

    const newSlideContent = await page
      .locator(".carousel-item.active")
      .innerText();
    expect(newSlideContent).not.toBe(firstSlideContent);
  });
});
