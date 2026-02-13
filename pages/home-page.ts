import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
  readonly signUpButton: Locator;
  readonly logInButton: Locator;
  readonly contactModal: Locator;

  constructor(page: Page) {
    super(page);

    this.signUpButton = page.locator("#signin2");
    this.logInButton = page.locator("#login2");
    this.contactModal = page.locator("#exampleModal");
  }

  async open() {
    await this.navigate();
  }

  async openSignUpModal() {
    await this.signUpButton.click();
  }

  async openLogInModal() {
    await this.logInButton.click();
  }
  async openModal() {
    await this.page.getByRole("link", { name: "Contact" }).click();
    await this.contactModal.waitFor({ state: "visible" });
  }
}
