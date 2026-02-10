import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";

test("Sign up modal can be opened from home page", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.openSignUpModal();

  await expect(page.locator("#signInModal")).toBeVisible();
});
