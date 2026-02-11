import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProductsDetailsPage extends BasePage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productsDescription: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator("h2.name");
    this.productPrice = page.locator(".price-container");
    this.productsDescription = page.locator(".description");
    this.addToCartButton = page.locator("a.btn-success");
  }
  async waitForPageLoad() {
    await this.productTitle.waitFor({ state: "visible" });
  }
}
