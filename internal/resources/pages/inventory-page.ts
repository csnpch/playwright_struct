import { expect, Locator, Page } from "@playwright/test"
import { routerDict } from "../../data/dict/router-dict"
import { env } from "../../configs/load_env"


export class InventoryPage {
  readonly page: Page
  readonly text_title: Locator
  
  constructor(page: Page) {
    this.page = page
    this.text_title = page.locator(`span[data-test*='title']`)
  }

  // Generated method
  async goToPage() {
    await this.page.goto(routerDict.inventory_page.path)
  }

  async verifyUrl() {
    await this.page.waitForURL(`${env.BASE_URL}${routerDict.inventory_page.path}`)
  }
  
  // Custom method
  async verifyTitle(text: string) {
    await this.text_title.waitFor({ state: 'visible' })
    expect(await this.text_title.textContent()).toBe(text)
  }
  
}