import { HomeRoute } from "./home-router";

import { BrowserRouter } from "react-router";


export function Routes() {
  function Route() {
    return <HomeRoute />
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
