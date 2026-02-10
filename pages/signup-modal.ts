import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class SignUpModal extends BasePage {
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.locator("#sign-username");
    this.passwordInput = page.locator("#sign-password");
    this.signUpButton = page.locator('button:has-text("Sign up")');
    this.closeButton = this.page
      .locator("#signInModal")
      .locator("button.btn.btn-secondary");
  }
  async signUp(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signUpButton.click();
  }

  async clickCloseButton() {
    await this.closeButton.click();
  }
}
