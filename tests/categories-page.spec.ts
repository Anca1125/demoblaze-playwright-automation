import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";

test.describe("categories", () => {
  test("categories - categories are visible", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.phonesCategorie.click();

    await expect(homePage.phonesCategorie).toBeVisible();
    await expect(homePage.laptopsCategories).toBeVisible();
    await expect(homePage.monitorCategories).toBeVisible();
  });
  test("categories - when click on phones categorie, a page with phones is displayed", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.phonesCategorie.click();

    const phonePage = page.locator("#tbodyid");

    await expect(phonePage).toContainText("Samsung galaxy s6");
  });
  test("categories - when click on laptops categorie, a page with laptops is displayed", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.laptopsCategories.click();
    await expect(page.locator("#tbodyid")).toBeVisible();

    const productTitles = await page.locator(".card-title").allTextContents();

    const allAreLaptops = productTitles.every(
      (title) =>
        title.toLowerCase().includes("sony vaio i5") ||
        title.toLowerCase().includes("macBook Pro") ||
        title.toLowerCase().includes("dell"),
    );
    //await expect(allAreLaptops).toBeTruthy();
    await expect(productTitles.length).toBeGreaterThan(0);
  });
  test("categories - when click on monitor categorie, a page with monitors is displayed", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.monitorCategories.click();

    const monitorsPage = page.locator("#tbodyid");

    await expect(monitorsPage).toContainText("Apple monitor 24");
  });
});
