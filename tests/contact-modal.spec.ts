import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { ContactPage } from "../pages/contact-modal";
import {
  validContactData,
  invalidContactData,
  blankData,
} from "../fixtures/contact-data";

test.describe("contact modal", () => {
  test("contact modal - user is able to sent a message via contact modal", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.navigate();
    await homePage.openModal();
    await expect(homePage.contactModal).toBeVisible();
    await contactPage.fillContactDatas(
      validContactData.email,
      validContactData.name,
      validContactData.message,
    );
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Thanks for the message!!");
      await dialog.accept();
    });
    await contactPage.sendContactMessage();
  });
  test("contact modal- should not accept invalid mail - known bug ", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.navigate();
    await homePage.openModal();
    await expect(homePage.contactModal).toBeVisible();
    await contactPage.fillContactDatas(
      blankData.email,
      blankData.name,
      blankData.message,
    );
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Thanks for the message!!");
      await dialog.accept();
    });
    await contactPage.sendContactMessage();
  });
  test("contact modal- should not accept blank fields - known bug ", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.navigate();
    await homePage.openModal();
    await expect(homePage.contactModal).toBeVisible();
    await contactPage.fillContactDatas(
      invalidContactData.email,
      invalidContactData.name,
      invalidContactData.message,
    );
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Thanks for the message!!");
      await dialog.accept();
    });
    await contactPage.sendContactMessage();
  });
  test("contact modal - user is able to close the modal", async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.navigate();
    await homePage.openModal();
    await expect(homePage.contactModal).toBeVisible();
    await contactPage.closeContactButton();
  });
});
