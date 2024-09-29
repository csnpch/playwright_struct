import { expect, Locator, Page } from "@playwright/test"
import { router_dict } from "../../data/dict/router-dict"
import { env } from "../../configs/load_env"


export class LoginPage {
  readonly page: Page
  // Locators
  readonly input_username: Locator
  readonly input_password: Locator
  readonly button_login: Locator
  readonly error_container: Locator
  readonly error_label: Locator


  constructor(page: Page) {
    this.page = page
    this.input_username = page.locator(`input#user-name`)
    this.input_password = page.locator(`input#password`)
    this.button_login = page.locator(`input#login-button`)
    this.error_container = page.locator(`div.error-message-container`)
    this.error_label = this.error_container.locator(`h3`)
  }

  // Base Method
  async goToPage() {
    await this.page.goto(`${env.BASE_URL}${router_dict.login_page.path}`)
  }
  

  async verifyUrl() {
    await this.page.waitForURL(`${env.BASE_URL}${router_dict.login_page.path}`)
  }


  async verifyErrorLabel(expected_text: string) {
    expect(await this.error_label.textContent()).toEqual(expected_text)
  }
  
  // Custom Method
  async login(username: string, password: string) {
    await this.input_username.fill(username)
    await this.input_password.fill(password)
    await this.button_login.click()
  }
}