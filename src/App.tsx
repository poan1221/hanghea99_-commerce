import { Suspense } from "react";
import "./App.css";

import { Router } from "./router/Router";
import { AuthStateObserver } from "@/hooks/useUserServices";
import GlobalAlertDialog from "@/components/common/AlertDialog";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthStateObserver />
      <GlobalAlertDialog />
      <Router />
    </Suspense>
  );
}

export default App;
