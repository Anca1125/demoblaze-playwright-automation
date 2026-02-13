import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class SignUpPage extends BasePage {
  readonly signupModal: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signupModal = page.locator("#signInModal");
    this.userNameInput = page.locator("#sign-username");
    this.passwordInput = page.locator("#sign-password");
    this.signUpButton = this.signupModal.getByRole("button", {
      name: "Sign up",
    });
    this.closeButton = this.signupModal.getByText("Close", { exact: true });
  }

  async signup(username: string, password: string) {
    await this.userNameInput.waitFor({ state: "visible" });
    await this.userNameInput.fill(username);

    await this.passwordInput.waitFor({ state: "visible" });
    await this.passwordInput.fill(password);
    await this.signUpButton.click();
  }

  async clickCloseButton() {
    await this.closeButton.click();
  }
}
