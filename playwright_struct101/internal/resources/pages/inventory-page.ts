import { expect, Locator, Page } from "@playwright/test"
import { router_dict } from "../../data/dict/router-dict"
import { env } from "../../configs/load_env"


export class InventoryPage {
  readonly page: Page
  readonly text_title: Locator
  // Inventory Container
  readonly inventory_list: Locator
  readonly inventory_item_name: (inventory_name: string) => Locator
  readonly inventory_item_price: (inventory_name: string) => Locator
  
  
  constructor(page: Page) {
    this.page = page
    this.text_title = page.locator(`span[data-test*='title']`)
    // Inventory Container
    this.inventory_list = page.locator('[data-test*="inventory-list"]')
    this.inventory_item_name = (inventory_name: string) => page.locator(`[data-test*="inventory-item"]:text("${inventory_name}")`)
    this.inventory_item_price = (inventory_name: string) => page.locator(`[data-test*="inventory-item"]:text("${inventory_name}")`)
  }

  // Base method
  async goToPage() {
    await this.page.goto(`${env.BASE_URL}${router_dict.inventory_page.path}`)
  }


  async verifyUrl() {
    await this.page.waitForURL(`${env.BASE_URL}${router_dict.inventory_page.path}`)
  }
  
  // Custom method
  async verifyTitle(text: string) {
    await this.text_title.waitFor({ state: 'visible' })
    expect(await this.text_title.textContent()).toBe(text)
  }


  async inventoryNameShouldBeShowInList(inventory_name: string) {
    await this.inventory_list.waitFor({ state: 'visible' })
    await expect(this.inventory_item_name(inventory_name).first()).toBeVisible()
  }


}
