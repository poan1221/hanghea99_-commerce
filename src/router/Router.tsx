import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./router.constant";
import { Layout } from "@/layouts/Layout";
import PrivateRoute from "@/router/PrivateRoute";

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {Object.entries(ROUTES).map(([key, { PATH, isAuth, COMPONENT }]) => (
          <Route
            key={key}
            path={PATH}
            element={
              isAuth ? <PrivateRoute component={COMPONENT} /> : <COMPONENT />
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
