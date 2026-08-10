import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Section } from "../components/Section";

import iconArrow from "../assets/icon-arrow.svg";

import { useNavigate, useParams } from "react-router";
import { api, baseURL } from "../services/api";
import { useEffect, useState } from "react";

interface Stage {
  id: string;
  title: string;
  description: string;
  category: {
    name: string;
  };
  stages: {
    id: string;
    description: string;
    time: string;
    picture?: string;
    title: string;
    video?: string;
  }[];
}

export function ViewerGuide() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [stages, setStages] = useState<Stage>();

  async function fetchHandler() {
    try {
      const response = await api.get(`guide/${id}`);
      setStages(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <>
      {stages && stages?.stages.length != 0 ? (
        <>
          <Header>
            <Button variant="tertiary" onClick={() => navigate("/")}>
              <img src={iconArrow} alt="Ícone de flecha" />
              Voltar
            </Button>
          </Header>
          <Section>
            <div>
              <span className="px-3 py-0.5 bg-[#FFEDD4] rounded-[999px]">
                {stages.category.name}
              </span>
            </div>
            <strong>{stages.title}</strong>
            <p>{stages.description}</p>

            <div className="flex flex-col gap-4">
              {stages?.stages.map((stage, index) => (
                <div key={stage.id} className="rounded-2xl">
                  <div className="flex w-full justify-between items-center bg-icon px-6 py-4 rounded-t-2xl">
                    <div className="w-9 h-9 p-1 bg-white/50 rounded-full flex justify-center items-center">
                      <p className="text-white">{index + 1}</p>
                    </div>
                    <strong className="text-white">{stage.title}</strong>
                    <small className="text-white">{`${stage.time} min`}</small>
                  </div>
                  <div>
                    {stage.picture && (
                      <img src={`${baseURL}${stage.picture}`} alt="" />
                    )}

                    {stage.video && (
                      <video width="640" height="360" controls>
                        <source
                          src={`${baseURL}${stage.video}`}
                          type="video/mp4"
                        />
                        Seu navegador não suporta a tag de vídeo.
                      </video>
                    )}

                    <div className="p-6 bg-white rounded-b-2xl">
                      <p>{stage.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <p>Este guia ainda não tem etapas.</p>
          <Button variant="tertiary" onClick={() => navigate("/")}>
            <img src={iconArrow} alt="ícone de flecha" />
            Voltar
          </Button>
        </div>
      )}
    </>
  );
}
