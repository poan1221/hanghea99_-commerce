import { useUserStore } from "@/store/useUserStore";
import { useLocation, Navigate } from "react-router-dom";

interface withAggregateProps {
  component: React.ComponentType<any>; // React 컴포넌트 타입을 받아야 함
  allowedType?: "customer" | "seller";
}

const withAggregate = ({
  component: Component,
  allowedType,
}: withAggregateProps) => {
  return function WithAggregateWrapper(props: any) {
    const user = useUserStore((state) => state.user);
    const location = useLocation();

    // 로그인 되어 있지 않으면
    if (!user) {
      return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // 허용되지 않는 유저 타입이면
    if (allowedType && user.userType !== allowedType) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };
};

export default withAggregate;
