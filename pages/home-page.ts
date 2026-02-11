import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
  readonly signUpButton: Locator;
  readonly logInButton: Locator;
  readonly loginModalForm: Locator;
  readonly userNameLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.signUpButton = page.locator("#signin2");
    this.logInButton = page.locator("#login2");
    this.loginModalForm = page.locator("#logInModal");
    this.userNameLocator = page.locator("#nameofuser");
  }

  async open() {
    await this.navigate();
  }

  async openSignUpModal() {
    await this.signUpButton.click();
  }

  async openLogInModal() {
    await this.logInButton.waitFor({ state: "visible" });
    await this.logInButton.click();
  }
}
