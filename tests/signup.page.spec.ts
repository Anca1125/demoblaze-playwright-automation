import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { SignUpPage } from "../pages/signup.page";
import { validSignUpUser } from "../fixtures/signup.data";

test("signup page - user is able to signup", async ({ page }) => {
  const homePage = new HomePage(page);
  const signUpPage = new SignUpPage(page);

  await homePage.navigate();
  await homePage.openSignUpModal();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Sign up successful");
    await dialog.accept();
  });
  await signUpPage.signup(validSignUpUser.username, validSignUpUser.password);
});

test("signup-page - close the modal", async ({ page }) => {
  const homePage = new HomePage(page);
  const signUpPage = new SignUpPage(page);

  await homePage.navigate();
  await homePage.openSignUpModal();
  await signUpPage.clickCloseButton();
  await expect(signUpPage.signupModal).toBeHidden();
});
