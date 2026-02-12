import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { SignUpModal } from "../pages/signup-modal";
import { signUpData } from "../fixtures/signup-data";

let homePage: HomePage;
let signUpModal: SignUpModal;

test.describe("signup flow", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpModal = new SignUpModal(page);

    await homePage.open();
    await homePage.openSignUpModal();

    await expect(page.locator("#signInModal")).toBeVisible();
  });

  test("signup flow - user can sign up with valid credentials", async ({
    page,
  }) => {
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Sign up successful");
      await dialog.accept();
    });

    await signUpModal.signUp(signUpData.username, signUpData.password);
    await expect(page.locator("#nameofuser")).toHaveText("Welcome test_user");
  });

  test("signup flow - user is not able to sign up with the same credentials", async ({
    page,
  }) => {
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("This user already exist.");
      await dialog.accept();
    });

    await signUpModal.signUp(signUpData.username, signUpData.password);
  });
  test("signup flow - close signup modal", async ({ page }) => {
    await signUpModal.clickCloseButton();
    await expect(page.locator("#signInModal")).not.toBeVisible();
  });
});
