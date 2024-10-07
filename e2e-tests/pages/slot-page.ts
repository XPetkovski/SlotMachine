import { Page, Locator } from '@playwright/test';

export class SlotPage {
    page: Page;
    incrementBetButton: Locator;
    decrementBetButton: Locator;
    betValue: Locator;
    maxBetButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.incrementBetButton = this.page.locator('#increment-wager');
        this.decrementBetButton = this.page.locator('#decrement-wager');
        this.betValue = this.page.locator('#wager-value');
        this.maxBetButton = this.page.locator('#max-bet-button');
    }

    async clickOnMaxBetButton() {
        await this.betValue.click();
        await this.maxBetButton.click();
    }

}