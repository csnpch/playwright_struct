export type T_RouterDict = {
  path: string,
}

export interface I_RouterDict {
  login_page: T_RouterDict,
  inventory_page: T_RouterDict,
}

export const routerDict: I_RouterDict = {
  login_page: { path: '/' },
  inventory_page: { path: '/inventory.html' },
}