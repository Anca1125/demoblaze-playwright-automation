import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class AboutUsModal extends BasePage {
  readonly aboutUsButton: Locator;
  readonly aboutUsContainer: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.aboutUsButton = page.getByRole("link", { name: "About us" });
    this.aboutUsContainer = page.locator("#videoModal");
    this.closeButton = page.locator("#videoModal .btn-secondary");
  }
  async open() {
    await this.aboutUsButton.click();
  }

  async close() {
    await this.closeButton.click();
  }
}
