import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
  readonly signUpButton: Locator;
  readonly logInButton: Locator;
  readonly loginModalForm: Locator;
  readonly userNameLocator: Locator;
  readonly carouselActiveImage: Locator;
  readonly nextButton: Locator;
  readonly previousButton: Locator;
  readonly categories: Locator;
  readonly phonesCategorie: Locator;
  readonly laptopsCategories: Locator;
  readonly monitorCategories: Locator;

  constructor(page: Page) {
    super(page);

    this.signUpButton = page.locator("#signin2");
    this.logInButton = page.locator("#login2");
    this.loginModalForm = page.locator("#logInModal");
    this.userNameLocator = page.locator("#nameofuser");
    this.carouselActiveImage = page.locator(".carousel-item.active img");
    this.nextButton = page.locator(".carousel-control-next");
    this.previousButton = page.locator(".carousel-control-prev");
    this.categories = page.locator("#cat");
    this.phonesCategorie = page.getByText("Phones");
    this.laptopsCategories = page.getByText("Laptops");
    this.monitorCategories = page.getByText("Monitors");
  }

  async open() {
    await this.navigate();
  }

  async openSignUpModal() {
    await this.signUpButton.click();
  }

  async openLogInModal() {
    await this.logInButton.waitFor({ state: "visible" });
    await this.logInButton.click();
  }
}
