import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class ContactPage extends BasePage {
  readonly contactModal: Locator;
  readonly contactEmail: Locator;
  readonly contactName: Locator;
  readonly contactMessage: Locator;
  readonly closeButton: Locator;
  readonly sendMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.contactModal = page.locator("#exampleModal");
    this.contactEmail = this.contactModal.locator("#recipient-email");
    this.contactName = this.contactModal.locator("#recipient-name");
    this.contactMessage = this.contactModal.locator("#message-text");
    this.closeButton = this.contactModal.locator(".btn-secondary");
    this.sendMessage = this.contactModal.locator(".btn-primary");
  }
  async openModal() {
    await this.page.getByRole("link", { name: "Contact" }).click();
    await this.contactModal.waitFor({ state: "visible" });
  }
  async fillContactDatas(email: string, name: string, message: string) {
    await this.contactEmail.fill(email);
    await this.contactName.fill(name);
    await this.contactMessage.fill(message);
  }
  async sendContactMessage() {
    await this.sendMessage.click();
  }
  async closeContactButton() {
    await this.closeButton.click();
  }
}
