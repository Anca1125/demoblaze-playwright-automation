import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginModal extends BasePage {
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;
  readonly loginModalForm: Locator;
  constructor(page: Page) {
    super(page);
    this.userNameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");
    this.loginModalForm = page.locator("#logInModal");
    this.loginButton = this.loginModalForm.locator("button.btn.btn-primary");
    this.closeButton = this.loginModalForm.locator("button.btn.btn-secondary");
  }

  async logIn(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickCloseButton() {
    await this.closeButton.click();
  }
}
