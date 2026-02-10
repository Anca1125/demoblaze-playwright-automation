import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  readonly cartLinK: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
  }
}
