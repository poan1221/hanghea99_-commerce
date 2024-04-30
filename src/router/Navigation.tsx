import { Link } from "react-router-dom";
import { ROUTES } from "./router.constant";

// 카테고리별 라우트 추가 필요
const NAV_ROUTES = {
  LIST: {
    ...ROUTES.HOME,
    TITLE: "New ARRIVAL",
  },
} as const;

export const Navigation = () => {
  return (
    <div className="global-nav-button-box">
      {Object.entries(NAV_ROUTES).map(([KEY, { PATH, TITLE }]) => (
        <Link key={KEY} className="global-nav-button mr-6" to={PATH}>
          {TITLE}
        </Link>
      ))}
    </div>
  );
};
