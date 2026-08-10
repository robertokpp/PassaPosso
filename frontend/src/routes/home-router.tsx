import { Routes, Route } from "react-router";

import { Home } from "../pages/Home";
import { NewGuide } from "../pages/NewGuide";
import { NewStage } from "../pages/NewStage";
import { NewCategory } from "../pages/NewCategory";
import { ViewerGuide } from "../pages/ViewerGuide";

export function HomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/nova-guia" element={<NewGuide />}></Route>
      <Route path="/nova-guia/:id" element={<NewGuide />}></Route>
      <Route path="/nova-etapa/:guideId" element={<NewStage />}></Route>
      <Route path="/category" element={<NewCategory />}></Route>
      <Route path="/guia/:id" element={<ViewerGuide />}></Route>
    </Routes>
  );
}
