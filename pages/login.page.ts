import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly openModal: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;
  constructor(page: Page) {
    super(page);

    this.openModal = page.locator("#logInModal");
    this.userNameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");
    this.loginButton = this.openModal.getByRole("button", { name: "Log in" });
    this.closeButton = this.openModal.getByRole("button", { name: "Close" });
  }

  async login(username: string, password: string) {
    await this.userNameInput.waitFor({ state: "visible" });
    await this.userNameInput.fill(username);

    await this.passwordInput.waitFor({ state: "visible" });
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickCloseButton() {
    await this.closeButton.click();
  }
}
