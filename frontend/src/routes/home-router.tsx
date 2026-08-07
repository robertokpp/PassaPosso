import { Routes, Route } from "react-router";

import { Home } from "../pages/Home";
import { NewGuide } from "../pages/NewGuide";
import { NewStage } from "../pages/NewStage";
import { NewCategory } from "../pages/NewCategory";

export function HomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/nova-guia" element={<NewGuide />}></Route>
      <Route path="/nova-etapa/:guideId" element={<NewStage />}></Route>
      <Route path="/category" element={<NewCategory />}></Route>
    </Routes>
  );
}
