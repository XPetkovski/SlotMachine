import { test, expect } from '@playwright/test';
import {SlotPage} from "../pages/slot-page";

test.describe('wager tests', () => {

    let slotPage: SlotPage;

    test.beforeEach(async ({ page }) => {
        slotPage = new SlotPage(page);
        await page.goto('/');
    });

    test('user should be able to increase the bet', async () => {
        await slotPage.incrementBetButton.click();
        await expect(slotPage.betValue).toContainText('2');
    });

    test('user should be able to decrease the bet', async () => {
        await slotPage.decrementBetButton.click();
        await expect(slotPage.betValue).toContainText('0.5');
    });

    test('user tries to set max bet', async () => {
        await slotPage.betValue.click();
        await slotPage.clickOnMaxBetButton();
        await expect(slotPage.betValue).toContainText('1000');
    });

});