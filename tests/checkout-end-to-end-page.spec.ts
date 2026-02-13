import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { CartPage } from "../pages/cart-page";
import { ProductsPage } from "../pages/products-page";
import { ProductsDetailsPage } from "../pages/products-details-page";
import { CheckoutModal } from "../pages/checkout-end-to-end-page";
import { validData, invalidData, blankFields } from "../fixtures/checkout-data";

test("checkout -user can complete checkout flow", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const checkout = new CheckoutModal(page);
  const productsPage = new ProductsPage(page);
  const productDetails = new ProductsDetailsPage(page);
  await homePage.navigate();
  await productsPage.clickOnProductByName("Samsung galaxy s6");
  await productDetails.addToCartButton.click();
  await cartPage.goToCartPage();
  await cartPage.waitForTheCartPageToLoad();
  await cartPage.clickPlaceOrder();
  await checkout.fillCheckoutForm(
    validData.name,
    validData.country,
    validData.city,
    validData.credit,
    validData.month,
    validData.year,
  );
  await checkout.submitPurchaseButtonModal();
  await expect(page.locator(".sweet-alert h2")).toHaveText(
    "Thank you for your purchase!",
  );
});
test("checkout -user is not able to complete checkout flow with invalid data - known bug", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const checkout = new CheckoutModal(page);
  const productsPage = new ProductsPage(page);
  const productDetails = new ProductsDetailsPage(page);
  await homePage.navigate();
  await productsPage.clickOnProductByName("Samsung galaxy s6");
  await productDetails.addToCartButton.click();
  await cartPage.goToCartPage();
  await cartPage.waitForTheCartPageToLoad();
  await cartPage.clickPlaceOrder();
  await checkout.fillCheckoutForm(
    invalidData.name,
    invalidData.country,
    invalidData.city,
    invalidData.credit,
    invalidData.month,
    invalidData.year,
  );
  await checkout.submitPurchaseButtonModal();
  await expect(page.locator(".sweet-alert h2")).toHaveText(
    "Thank you for your purchase!",
  );
});
test("checkout -user is not able to complete checkout flow with blank fielda in form", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const checkout = new CheckoutModal(page);
  const productsPage = new ProductsPage(page);
  const productDetails = new ProductsDetailsPage(page);
  await homePage.navigate();
  await productsPage.clickOnProductByName("Samsung galaxy s6");
  await productDetails.addToCartButton.click();
  await cartPage.goToCartPage();
  await cartPage.waitForTheCartPageToLoad();
  await cartPage.clickPlaceOrder();
  await checkout.fillCheckoutForm(
    blankFields.name,
    blankFields.country,
    blankFields.city,
    blankFields.credit,
    blankFields.month,
    blankFields.year,
  );
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Please fill out Name and Creditcard.");
    await dialog.accept();
  });
  await checkout.submitPurchaseButtonModal();
});
