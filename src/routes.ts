export const ROUTES = {
  home: '/',
  categories: '/categories',
  productList: '/products',
  productDetail: '/product',
  reviews: '/reviews',
  configurator: '/configurator',
  configuratorAddOns: '/configurator/add-ons',
  cart: '/cart',
  checkout: '/checkout',
  orderConfirmation: '/orders/confirmation',
  orders: '/orders',
  returns: '/orders/returns',
  dashboard: '/dashboard',
  utilities: '/utilities',
  b2b: '/b2b',
  emptyStates: '/empty-states',
  errors: '/errors',
  permissions: '/permissions'
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
