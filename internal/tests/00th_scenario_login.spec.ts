import { test } from './../resources/fixture'
import { routerDict } from '../data/dict/router-dict'
import { accounts } from './../data/testdata/account.json'
import { zeroth } from './../data/testdata/00th.json'


test.describe(`00th - Login Scenario`, () => {
  test.beforeEach(async ({ navigationComponent }) => {
    await navigationComponent.navigateToPage(routerDict.login_page)
  })
  test.afterEach(async ({ navigationComponent }) => {
    await navigationComponent.closePage()
  })
  test(`TC-01: Login to inventory page`, async ({
    loginPage,
    inventoryPage
  }) => {
    await loginPage.login(accounts.standard_user.username, accounts.standard_user.password)
    await inventoryPage.verifyTitle(zeroth.expects.inventory_page.title_text)
  })
})