import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class CartPage extends BasePage {
  readonly CartRows: Locator;
  readonly itemPrices: Locator;
  readonly totalPrice: Locator;
  readonly placeOrderButton: Locator;
  constructor(page: Page) {
    super(page);
    this;
    this.CartRows = page.locator("tbody tr");
    this.itemPrices = page.locator("tbody tr td:nth-child(3)");
    this.totalPrice = page.locator("#totalp");
    this.placeOrderButton = page.getByRole("button", { name: "Place Order" });
  }
  async goToCartPage() {
    await this.page.click("#cartur");
  }
  async waitForTheCartPageToLoad() {
    await this.CartRows.first().waitFor({ state: "visible" });
  }
  async getItemPrices(): Promise<number[]> {
    const pricesText = await this.itemPrices.allTextContents();
    return pricesText.map((price) => Number(price));
  }

  async getTotal(): Promise<number> {
    const total = await this.totalPrice.textContent();
    return Number(total);
  }
  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }
}
