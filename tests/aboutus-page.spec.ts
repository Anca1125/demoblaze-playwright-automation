import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { AboutUsModal } from "../pages/aboutus-modal";

test.describe("about us modal", () => {
  test("about us modal - open the modal", async ({ page }) => {
    const homePage = new HomePage(page);
    const aboutUs = new AboutUsModal(page);
    await homePage.navigate();
    await aboutUs.open();

    await expect(aboutUs.aboutUsContainer).toBeVisible();
    await aboutUs.close();
    await expect(aboutUs.aboutUsContainer).not.toBeVisible();
  });
});
