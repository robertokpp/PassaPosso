import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { formatDate } from "../utils/formatterData";

import { api } from "../services/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import iconAdd from "../assets/icon-add.svg";
import iconQuadro from "../assets/icon-quadro.svg";
import { Section } from "../components/Section";

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  data: string;
}

export function Home() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function handlerListCards() {
    try {
      const response = await api.get("/guide");
      setGuides(response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handlerListCards();
  }, []);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-screen bg-background text-text">
        Carregando pagina...
      </main>
    );
  }

  return (
    <>
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

      <main>
        <Section>
          <div className="mt-4 flex flex-col gap-4">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="flex flex-col w-full gap-2 bg-white p-4 hover:[&_strong]:text-icon rounded-2xl"
              >
                <div className="flex justify-between items-center">
                  <span className="px-3 py-0.5 bg-[#FFEDD4] rounded-[999px]">
                    {guide.category}
                  </span>
                  <small className="text-[10px] text-text">
                    {formatDate(guide.data)}
                  </small>
                </div>

                <strong>{guide.title}</strong>

                <p>{guide.description}</p>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="w-full justify-center text-icon font-bold"
                    onClick={() => navigate(`/guia/${guide.id}`)}
                  >
                    Visualizar
                  </Button>
                  <Button
                    variant="tertiary"
                    className="w-full justify-center text-[#57534D] font-bold"
                    onClick={() => navigate(`/nova-guia/${guide.id}`)}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
