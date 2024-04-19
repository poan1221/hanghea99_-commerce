import "./App.css";
import { Layout } from "./layouts/Layout";
import { Router } from "./router/Router";

function App() {
  return (
    <>
      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
