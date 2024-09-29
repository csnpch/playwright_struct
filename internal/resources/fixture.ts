import { test as base, expect } from '@playwright/test'
import { LoginPage } from './pages/login-page'
import { InventoryPage } from './pages/inventory-page'
import { NavigationComponent } from './components/navigatation'


type T_MyFixtures = {
  // Pages
  loginPage: LoginPage,
  inventoryPage: InventoryPage,
  // Components
  navigationComponent: NavigationComponent,
}


export const test = base.extend<T_MyFixtures>({
  // Pages
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => await use(new InventoryPage(page)),
  // components
  navigationComponent: async ({ page }, use) => await use(new NavigationComponent(page))
})


export { expect }