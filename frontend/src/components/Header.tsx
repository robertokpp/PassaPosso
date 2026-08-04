import iconQuadro from "../assets/icon-quadro.svg";
import iconAdd from "../assets/icon-add.svg";
import { useNavigate } from "react-router";

import { Button } from "./Button";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between py-4 px-6 bg-white">
      <div className="flex  gap-2 items-center">
        <div className="bg-icon p-2 w-fit h-fit rounded-[10px] flex justify-center items-center">
          <img src={iconQuadro} alt="ícone de um quadro" />
        </div>
        <p>PassaPasso</p>
      </div>
      <div>
        <Button onClick={() => navigate("/nova-guia")}>
          <img src={iconAdd} alt="icon de adicionar" />
          Nova guia
        </Button>
      </div>
    </header>
  );
}
