import { test } from './../internal/resources/fixture'
import { router_dict } from './../internal/data/dict/router-dict'
import { accounts } from './../internal/data/testdata/account.json'
import { data_page } from './../internal/data/testdata/page.json'


test.describe(`00th - Login Scenario`, () => {
  
  test.beforeEach(async ({ navigationComponent }) => {
    await navigationComponent.navigateToPage(router_dict.login_page)
  })

  test.afterEach(async ({ navigationComponent }) => {
    await navigationComponent.closePage()
  })

  test(`TC-0001: Login to inventory page`, async ({
    loginPage,
    inventoryPage
  }) => {
    await loginPage.login(
      accounts.standard_user.username,
      accounts.standard_user.password
    )
    await inventoryPage.verifyUrl()
    await inventoryPage.verifyTitle(data_page.inventory_page.title_text)
  })

  test(`TC-0002: Login with locked user`, async ({
    loginPage,
  }) => {
    await loginPage.login(
      accounts.locked_user.username,
      accounts.locked_user.password
    )
    await loginPage.verifyErrorLabel(accounts.locked_user.error_message)
  })

})