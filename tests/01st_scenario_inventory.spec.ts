import { test } from './../internal/resources/fixture'
import { router_dict } from './../internal/data/dict/router-dict'
import { accounts } from './../internal/data/testdata/account.json'
import { testdata_01st } from './../internal/data/testdata/01st.json'


test.describe(`01st - Inventory Scenario`, () => {
  
  test.beforeEach(async ({ 
    navigationComponent,
    loginPage,
    inventoryPage
  }) => {
    await navigationComponent.navigateToPage(router_dict.login_page)
    await loginPage.login(
      accounts.standard_user.username,
      accounts.standard_user.password
    )
    await inventoryPage.goToPage()
    await inventoryPage.verifyUrl()
  })

  test.afterEach(async ({ navigationComponent }) => {
    await navigationComponent.closePage()
  })

  test(`TC-0101: Navigation to product detail`, async ({
    page,
    inventoryPage
  }) => {
    await inventoryPage.inventoryNameShouldBeShowInList(testdata_01st.thrid_product.name)
  })
  
  test(`TC-0102: Add product to cart`, async ({
  }) => {
  
  })

})