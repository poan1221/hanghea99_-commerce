import { Routes } from "./router.type";
import {
  ProductList,
  Detail,
  ProductCategoryList,
  ProductSeriesList,
} from "../pages/product";
import { Main, Cart, NotFound, Login, SignUp } from "../pages";
import { MyList, AddProduct, EditProduct } from "../pages/admin";

export const ROUTES: Routes = {
  HOME: {
    PATH: "/",
    isAuth: false,
    COMPONENT: Main,
  },

  LOGIN: {
    PATH: "/Login",
    isAuth: false,
    COMPONENT: Login,
  },

  SIGNUP: {
    PATH: "/SignUp",
    isAuth: false,
    COMPONENT: SignUp,
  },

  LIST: {
    PATH: "/list",
    isAuth: false,
    COMPONENT: ProductList,
  },

  DETAIL: {
    PATH: "/detail/:id",
    isAuth: false,
    COMPONENT: Detail,
  },

  CART: {
    PATH: "/cart",
    isAuth: true,
    COMPONENT: Cart,
  },

  MYLIST: {
    PATH: "/mylist",
    isAuth: true,
    COMPONENT: MyList,
  },

  ADDPRODUCT: {
    PATH: "/addProduct",
    isAuth: true,
    COMPONENT: AddProduct,
  },

  EDITPRODUCT: {
    PATH: "/editProduct/:id",
    isAuth: true,
    COMPONENT: EditProduct,
  },

  CATEGORYLIST: {
    PATH: "/category/:id",
    isAuth: false,
    COMPONENT: ProductCategoryList,
  },

  SERIESLIST: {
    PATH: "/series/:id",
    isAuth: false,
    COMPONENT: ProductSeriesList,
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

  // NOT_FOUND: {
  //   PATH: "*",
  //   COMPONENT: NotFound,
  // },
} as const;
