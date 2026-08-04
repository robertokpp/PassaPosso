import { Routes, Route } from "react-router";

import { Home } from "../pages/Home";
import { NewGuide } from "../pages/NewGuide";

export function HomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/nova-guia" element={<NewGuide/>}></Route>
    </Routes>
  );
}
