import { NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "./router.constant";
import { CATEGORIES, SERIES } from "@/types/product";
import { useState } from "react";
import { addSpaceSeriesTitle } from "@/utils/addSpaceSeriesTitle";

// 카테고리별 라우트 추가 필요
const NAV_ROUTES = {
  HOME: {
    ...ROUTES.HOME,
    TITLE: "NEW ARRIVAL",
  },
} as const;

export const Navigation = () => {
  const isSeriesPage = useLocation().pathname.includes("series");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex gap-6 mb-[-1px] global-nav-wrap">
      {Object.entries(NAV_ROUTES).map(([KEY, { PATH, TITLE }]) => (
        <NavLink
          key={KEY}
          className={({ isActive }) =>
            isActive
              ? "nav-item-active font-bold text-slate-900 border-b-2 border-slate-900"
              : "text-slate-900 nav-item"
          }
          to={PATH}
        >
          {TITLE}
        </NavLink>
      ))}
      {/* 시리즈 별 네비 */}
      <div
        className={`z-50 relative nav-item cursor-pointer ${
          isSeriesPage
            ? "nav-item-active border-b-2 border-slate-900 font-bold"
            : ""
        }`}
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        <NavLink className="text-slate-900 nav-item" to="#">
          SEASON MD
        </NavLink>
        {showDropdown && (
          <div className="absolute top-full left-0 w-40 bg-white py-2 px-4 shadow-md">
            {Object.entries(SERIES).map(([key]) => (
              <NavLink
                key={key}
                className="block font-normal text-slate-500 hover:text-slate-900 hover:font-medium py-1"
                to={`/series/${key}`}
              >
                {addSpaceSeriesTitle(key)}
              </NavLink>
            ))}
          </div>
        )}
      </div>
      {/* 카테고리 링크 추가 */}
      {Object.entries(CATEGORIES).map(([key]) => (
        <NavLink
          key={key}
          className={({ isActive }) =>
            isActive
              ? "nav-item-active font-bold text-slate-900 border-b-2 border-slate-900"
              : "text-slate-900 nav-item"
          }
          to={`/category/${key}`}
        >
          {addSpaceSeriesTitle(key).toUpperCase()}
        </NavLink>
      ))}
    </div>
  );
};
