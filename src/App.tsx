import { Suspense } from "react";
import "./App.css";

import { Router } from "./router/Router";
import { AuthStateObserver } from "@/hook/useUserServices";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthStateObserver />
      <Router />
    </Suspense>
  );
}

export default App;
