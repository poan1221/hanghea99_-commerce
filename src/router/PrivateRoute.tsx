import { useUserStore } from "@/store/useUserStore";
import { useLocation, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<any>;

  allowedType?: "customer" | "seller";
}

const PrivateRoute = ({
  component: Component,
  allowedType,
}: PrivateRouteProps) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  // 로그인 되어 있지 않으면
  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // 허용되지 않는 유저 타입이면
  if (allowedType && user.userType !== allowedType) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default PrivateRoute;
