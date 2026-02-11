import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { LoginModal } from "../pages/login-modal";
import {
  validLoginpData,
  invalidUsernameLoginpData,
  invalidPasswprdLoginpData,
  blankFields,
} from "../fixtures/login-data";

let homePage: HomePage;
let loginModal: LoginModal;

test.describe("login flow", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginModal = new LoginModal(page);

    await homePage.navigate();
    await homePage.openLogInModal();
    // await expect(page.locator("#logInModal")).toBeVisible();
    await expect(loginModal.loginModalForm).toBeVisible();
  });
  test("login flow - user is able yo login with valid data", async () => {
    await loginModal.logIn(validLoginpData.username, validLoginpData.password);
    await expect(loginModal.loginModalForm).not.toBeVisible();
    //assertion
    await expect(homePage.userNameLocator).toContainText(
      `Welcome ${validLoginpData.username}`,
    );
  });
  test("login flow - user is not able to login with invalid username", async ({
    page,
  }) => {
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("User does not exist.");
      dialog.accept();
    });
    await loginModal.logIn(
      invalidUsernameLoginpData.username,
      validLoginpData.password,
    );
  });
  test("login flow - user is not able to login with invalid password", async ({
    page,
  }) => {
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Invalid password.");
      dialog.accept();
    });
    await loginModal.logIn(
      validLoginpData.username,
      invalidPasswprdLoginpData.password,
    );
  });
  test("login flow - user is not able to login with blank fields", async ({
    page,
  }) => {
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Please fill out Username and Password.");
      dialog.accept();
    });
    await loginModal.logIn(blankFields.username, blankFields.password);
  });
});
