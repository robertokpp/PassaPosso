import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Button } from "../components/Button";

import { api } from "../services/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import iconAdd from "../assets/icon-add.svg";
import iconQuadro from "../assets/icon-quadro.svg";



export function Home() {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();
  async function handlerListCards() {
    const response = await api.get("/guide");

    console.log(response.data);
  }

  useEffect(() => {
    handlerListCards();
  }, []);

  return (
    <main className=" bg-background h-full pb-6">
      <Header>
        <div className="flex  gap-2 items-center">
          <div className="bg-icon p-2 w-fit h-fit rounded-[10px] flex justify-center items-center">
            <img src={iconQuadro} alt="ícone de um quadro" />
          </div>
          <p>PassaPasso</p>
        </div>
        <div className="flex flex-col gap-2 truncate">
          <Button
            variant="secondary"
            className="truncate"
            onClick={() => navigate("/category")}
          >
            <img src={iconAdd} alt="icon de adicionar" />
            <span className="truncate">Categorias</span>
          </Button>

          <Button onClick={() => navigate("/nova-guia")}>
            <img src={iconAdd} alt="icon de adicionar" />
            <span className="truncate">Nova guia</span>
          </Button>
        </div>
      </Header>
      <section className="px-6">
        <div className="mt-4 flex flex-col gap-2">
          <Card></Card>
          <Card></Card>
        </div>
      </section>
    </main>
  );
}
