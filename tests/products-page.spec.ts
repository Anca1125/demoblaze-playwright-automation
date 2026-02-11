import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/products-page";
import { ProductsDetailsPage } from "../pages/products-details-page";
import { CartPage } from "../pages/cart-page";

let productsPage: ProductsPage;

test.describe("products page", () => {
  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.navigate();
  });

  test("products page - user is able to see the products", async () => {
    await productsPage.products.first().waitFor({ state: "visible" });

    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);
  });

  test("products page - user is able to click on product and see details", async ({
    page,
  }) => {
    const productName = "Samsung galaxy s6";
    await productsPage.clickOnProductByName(productName);
    const productsDetailsPage = new ProductsDetailsPage(page);
    await productsDetailsPage.waitForPageLoad();
    await expect(productsDetailsPage.productTitle).toHaveText(productName);
  });

  test('products page-user is able to add product to cart and see alert message "Product added"', async ({
    page,
  }) => {
    const productName = "Samsung galaxy s6";
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toBe("Product added");
      dialog.accept();
    });
    await productsPage.clickOnProductByName(productName);
    const productsDetailsPage = new ProductsDetailsPage(page);
    await productsDetailsPage.waitForPageLoad();
    await productsDetailsPage.addToCartButton.click();
  });
  test.skip("user can add multiple items and total is correct", async ({
    page,
  }) => {
    // TODO: stabilize navigation + cart logic
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.navigate();
    await productsPage.waitForProductsToLoad();
    const items = ["Samsung galaxy s6", "Nexus 6"];

    for (const item of items) {
      await productsPage.navigate();
      await productsPage.waitForProductsToLoad();
      await productsPage.clickOnProductByName(item);
      const detailsPage = new ProductsDetailsPage(page);
      await expect(detailsPage.productTitle).toBeVisible();
      page.once("dialog", async (dialog) => {
        await dialog.accept();
      });
      await detailsPage.addToCartButton.click();
      await productsPage.navigate();
      await productsPage.waitForProductsToLoad();
    }
    await cartPage.goToCartPage();
    await cartPage.waitForTheCartPageToLoad();
    const prices = await cartPage.getItemPrices();
    const calculatedTotal = prices.reduce((sum, price) => sum + price, 0);
    const displayedTotal = await cartPage.getTotal();
    expect(calculatedTotal).toBe(displayedTotal);
  });
});
