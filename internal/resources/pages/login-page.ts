import { Locator, Page } from "@playwright/test"
import { routerDict } from "../../data/dict/router-dict"
import { InventoryPage } from "./inventory-page"
import { env } from "../../configs/load_env"


export class LoginPage {
  readonly page: Page
  // Co-Page
  readonly inventoryPage: InventoryPage
  // Locators
  readonly input_username: Locator
  readonly input_password: Locator
  readonly button_login: Locator

  constructor(page: Page) {
    this.page = page
    this.inventoryPage = new InventoryPage(page)
    this.input_username = page.locator(`input#user-name`)
    this.input_password = page.locator(`input#password`)
    this.button_login = page.locator(`input#login-button`)
  }

  // Base Method
  async goToPage() {
    await this.page.goto(routerDict.login_page.path)
  }

  async verifyUrl() {
    await this.page.waitForURL(`${env.BASE_URL}${routerDict.login_page.path}`)
  }
  
  // Custom Method
  async login(username: string, password: string) {
    await this.input_username.fill(username)
    await this.input_password.fill(password)
    await this.button_login.click()
    await this.inventoryPage.verifyUrl()
  }
}