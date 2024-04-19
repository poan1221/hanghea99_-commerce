import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./router.constant";

export const Router = () => {
  return (
    <Routes>
      {Object.entries(ROUTES).map(([key, { PATH, COMPONENT }]) => (
        <Route key={key} path={PATH} element={<COMPONENT />} />
      ))}
    </Routes>
  );
};
