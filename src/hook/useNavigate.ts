import { useLocation, useNavigate as useReactNavigate } from "react-router-dom";
import { ROUTES } from "@/router/router.constant";
import { IProductInfo } from "@/types/product";

interface NavigateProps {
  state?: {
    product: IProductInfo;
  };
}

const Parser = {
  dynamicRoute(path: string, id: number) {
    return path.replace(":id", id.toString());
  },
};

export const useNavigate = () => {
  const navigate = useReactNavigate();
  const { state: locationState } = useLocation();

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

  const moveDetail = (id: number, { state }: NavigateProps = {}) => {
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

  return {
    moveHome,
    moveLogin,
    moveSignup,
    moveList,
    moveDetail,
    moveCart,
    moveMyList,
    moveAddProduct,
    locationState,
  };
};
