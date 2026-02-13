import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class CheckoutModal extends BasePage {
  readonly orderModal: Locator;
  readonly nameModal: Locator;
  readonly countryModal: Locator;
  readonly cityModal: Locator;
  readonly creditCardModal: Locator;
  readonly monthModal: Locator;
  readonly yearModal: Locator;
  readonly purchaseButtonModal: Locator;
  readonly closeButtonModal: Locator;

  constructor(page: Page) {
    super(page);
    this.orderModal = page.locator("#orderModal");
    this.nameModal = this.orderModal.locator("#name");
    this.countryModal = this.orderModal.locator("#country");
    this.cityModal = this.orderModal.locator("#city");
    this.creditCardModal = this.orderModal.locator("#card");
    this.monthModal = this.orderModal.locator("#month");
    this.yearModal = this.orderModal.locator("#year");
    this.purchaseButtonModal = this.orderModal.locator(".btn-primary");
    this.closeButtonModal = this.orderModal.locator(".btn-secondary");
  }

  async openCheckoutModal() {
    await this.page.getByRole("button", { name: "Place Order" }).click();
    await this.orderModal.waitFor({ state: "visible" });
  }
  async fillCheckoutForm(
    name: string,
    country: string,
    city: string,
    credit: string,
    month: string,
    year: string,
  ) {
    await this.nameModal.fill(name);
    await this.countryModal.fill(country);
    await this.cityModal.fill(city);
    await this.creditCardModal.fill(credit);
    await this.monthModal.fill(month);
    await this.yearModal.fill(year);
  }

  async closeModalButton() {
    await this.closeButtonModal.click();
  }
  async submitPurchaseButtonModal() {
    await this.purchaseButtonModal.click();
  }
}
