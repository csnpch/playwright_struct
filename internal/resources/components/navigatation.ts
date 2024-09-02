import { Page } from "@playwright/test"
import { env } from "../../configs/load_env"
import { I_RouterDict } from "../../data/dict/router-dict"

export class NavigationComponent {
  readonly page: Page
  
  constructor(page: Page) {
    this.page = page
  }

  async navigateTo(payload: {
    path: string, 
    params?: [], 
    query?: {}
  }) {
    const params = payload?.params ? `/${payload?.params.join('/')}` : ''
    const query = payload?.query ? `?${new URLSearchParams(payload?.query)}` : ''
    await this.page.goto(`${env.BASE_URL}${payload.path}${params}${query}`)
    // Verify page after navigation
    await this.page.waitForLoadState('networkidle')
    await this.page.waitForURL(`${env.BASE_URL}${payload.path}${params}${query}`)
  }

  async navigateToPage(page: I_RouterDict[keyof I_RouterDict]) {
    await this.navigateTo({ path: page.path })
  }

  async navigateBack() {
    await this.page.goBack()
  }

  async navigateForward() {
    await this.page.goForward()
  }

  async reloadPage() {
    await this.page.reload()
  }

  async closePage() {
    await this.page.close()
  }
  
}