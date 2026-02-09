import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import {
  validLoginUser,
  invalidLoginUser,
  emptyFieldLoginUser,
  wrongPasswordLoginUser,
} from "../fixtures/login.data";

test.describe("login flow", async () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.openLogInModal();
  });

  test("login flow - the user is able to login with valid cedentials", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(validLoginUser.username, validLoginUser.password);
    await expect(page.locator("#nameofuser")).toContainText(
      `Welcome ${validLoginUser.username}`,
    );
  });
  test("login flow - the user is not able to login with invalid username", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("User does not exist");
      await dialog.accept();
    });
    await loginPage.login(invalidLoginUser.username, invalidLoginUser.password);
  });

  test("login flow - the user is not able to login with invalid password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Wrong password");
      await dialog.accept();
    });
    await loginPage.login(
      wrongPasswordLoginUser.username,
      wrongPasswordLoginUser.password,
    );
  });

  test("login flow - the user is not able to login with blank fields", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "Please fill out Username and Password.",
      );
      await dialog.accept();
    });
    await loginPage.login(
      emptyFieldLoginUser.username,
      emptyFieldLoginUser.password,
    );
  });
});
