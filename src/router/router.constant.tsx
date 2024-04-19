import { Routes } from "./router.type";
import { List, Detail } from "../pages/product";
import { Main, Cart, NotFound, Login, SignUp } from "../pages";

export const ROUTES: Routes = {
  HOME: {
    PATH: "/",
    COMPONENT: Main,
  },

  LOGIN: {
    PATH: "/Login",
    COMPONENT: Login,
  },

  SIGNUP: {
    PATH: "/SignUp",
    COMPONENT: SignUp,
  },

  LIST: {
    PATH: "/list",
    COMPONENT: List,
  },

  DETAIL: {
    PATH: "/detail/:id",
    COMPONENT: Detail,
  },

  CART: {
    PATH: "/cart",
    COMPONENT: Cart,
  },

  // 추가...

  //   ORDER: {
  //     PATH: "/order",
  //     COMPONENT: Order,
  //   },

  //   ORDER_LIST: {
  //     PATH: "/orderList",
  //     COMPONENT: OrderList,
  //   },

  //   ORDER_DETAIL: {
  //     PATH: "/orderDetail",
  //     COMPONENT: OrderDetail,
  //   },

  NOT_FOUND: {
    PATH: "*",
    COMPONENT: NotFound,
  },
} as const;
