import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProductsPage extends BasePage {
  readonly products: Locator;
  readonly productsTitles: Locator;
  readonly productsPrices: Locator;

  constructor(page: Page) {
    super(page);

    this.products = page.locator(".card");
    this.productsTitles = page.locator(".card-title");
    this.productsPrices = page.locator(".card-block h5");
  }

  async getProductsCount() {
    return await this.products.count();
  }
  async clickOnProductByName(productName: string) {
    await this.page.locator(".card-title", { hasText: productName }).click();
  }
  async waitForProductsToLoad() {
    await this.products.first().waitFor({ state: "visible" });
  }
}
