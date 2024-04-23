import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./router.constant";
import { Layout } from "@/layouts/Layout";

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {Object.entries(ROUTES).map(([key, { PATH, COMPONENT }]) => (
          <Route key={key} path={PATH} element={<COMPONENT />} />
        ))}
      </Route>
    </Routes>
  );
};
