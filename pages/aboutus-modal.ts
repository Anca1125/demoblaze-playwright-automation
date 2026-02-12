import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class AboutUsModal extends BasePage {
  readonly aboutUsButton: Locator;
  readonly modal: Locator;
  readonly closeButton: Locator;
  readonly videoFrame: Locator;

  constructor(page: Page) {
    super(page);
    this.aboutUsButton = page.getByRole("link", { name: "About us" });
    this.modal = page.locator("#videoModal");
    this.closeButton = this.modal.locator(".btn-secondary");
    this.videoFrame = this.modal.locator("iframe");
  }
  async open() {
    await this.aboutUsButton.click();
    await this.modal.waitFor({ state: "visible" });
  }

  async close() {
    await this.closeButton.click();
    await this.modal.waitFor({ state: "hidden" });
  }
  async isVideoVisible() {
    return await this.videoFrame.isVisible();
  }
}
