import { useLocation, useNavigate as useReactNavigate } from "react-router-dom";
import { ROUTES } from "@/router/router.constant";
import { IProductInfo } from "@/types/product";

interface NavigateProps {
  state?: {
    product: IProductInfo;
  };
}

const Parser = {
  dynamicRoute(path: string, id: string) {
    return path.replace(":id", id);
  },
};

export const useNavigate = () => {
  const navigate = useReactNavigate();
  const { state: locationState } = useLocation();

  const moveBack = () => {
    return navigate(-1);
  };

  const moveHome = ({ state }: NavigateProps = {}) => {
    return navigate(ROUTES.HOME.PATH, { state });
  };

  const moveLogin = ({ state }: NavigateProps = {}) => {
    return navigate(ROUTES.LOGIN.PATH, { state });
  };

  const moveSignup = ({ state }: NavigateProps = {}) => {
    return navigate(ROUTES.SIGNUP.PATH, { state });
  };

  const moveList = ({ state }: NavigateProps = {}) => {
    return navigate(ROUTES.LIST.PATH, { state });
  };

  const moveDetail = (id: string, { state }: NavigateProps = {}) => {
    return navigate(Parser.dynamicRoute(ROUTES.DETAIL.PATH, id), { state });
  };

  const moveCart = ({ state }: NavigateProps = {}) => {
    return navigate(ROUTES.CART.PATH, { state });
  };

  const moveMyList = ({ state }: NavigateProps = {}) => {
    return navigate(ROUTES.MYLIST.PATH, { state });
  };

  const moveAddProduct = ({ state }: NavigateProps = {}) => {
    return navigate(ROUTES.ADDPRODUCT.PATH, { state });
  };

  const moveEditProduct = (id: string, { state }: NavigateProps = {}) => {
    return navigate(Parser.dynamicRoute(ROUTES.EDITPRODUCT.PATH, id), {
      state,
    });
  };
  const moveCategoryList = (id: string, { state }: NavigateProps = {}) => {
    return navigate(Parser.dynamicRoute(ROUTES.CATEGORYLIST.PATH, id), {
      state,
    });
  };

  return {
    moveBack,
    moveHome,
    moveLogin,
    moveSignup,
    moveList,
    moveDetail,
    moveCart,
    moveMyList,
    moveAddProduct,
    moveEditProduct,
    moveCategoryList,
    locationState,
  };
};
