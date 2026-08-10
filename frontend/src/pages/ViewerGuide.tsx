import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { api, baseURL } from "../services/api";

interface Guide {
  id: string;
  title: string;
  description: string;
  category: { name: string };
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
  const [guide, setGuide] = useState<Guide>();
  const [currentStage, setCurrentStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGuide() {
      try {
        const response = await api.get(`guide/${id}`);
        setGuide(response.data);
      } finally {
        setIsLoading(false);
      }
    }

    loadGuide();
  }, [id]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-screen bg-background text-text">
        Carregando guia...
      </main>
    );
  }

  if (!guide?.stages.length) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-6 text-center">
        <div>
          <p className="mb-4 text-text">Este guia ainda não tem etapas.</p>
          <button className="text-icon" onClick={() => navigate("/")}>
            ← Voltar
          </button>
        </div>
      </main>
    );
  }

  const stage = guide.stages[currentStage];
  const totalStages = guide.stages.length;
  const progress = ((currentStage + 1) / totalStages) * 100;
  const isFirst = currentStage === 0;
  const isLast = currentStage === totalStages - 1;

  function next() {
    if (isLast) navigate("/");
    else setCurrentStage((value) => value + 1);
  }

  return (
    <main className="min-h-screen bg-background pb-24 text-[#292524]">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white px-6 pb-3 pt-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between text-sm">
          <button
            className="flex items-center gap-2 text-text transition hover:text-[#292524]"
            onClick={() => navigate(-1)}
          >
            <span aria-hidden="true">‹</span> Voltar
          </button>
          <span className="font-medium text-text">
            {currentStage + 1} / {totalStages}
          </span>
        </div>
        <div className="mx-auto mt-3 h-1 max-w-3xl overflow-hidden rounded-full bg-[#F1F0EF]">
          <div
            className="h-full rounded-full bg-icon transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <section className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFEDD4] px-3 py-1 text-xs font-semibold text-[#B9471C]">
            <span aria-hidden="true">⌕</span> {guide.category.name}
          </span>
          <h1 className="mt-4 text-2xl font-bold leading-tight">
            {guide.title}
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#79716B]">
            {guide.description}
          </p>
        </div>

        <article className="overflow-hidden rounded-2xl bg-white">
          <div className="flex items-center gap-4 bg-icon px-5 py-4 text-white">
            <div>


            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-sm font-semibold">
              {currentStage + 1}
            </span>
            <h2 className="text-lg font-bold leading-tight">{stage.title}</h2>
            </div>

            <span className="flex items-center gap-1 text-xs">
              <span aria-hidden="true">◷</span> {stage.time} min
            </span>
          </div>

          <div className="p-5 sm:p-6">
            {stage.picture && (
              <img
                className="aspect-video w-full rounded-xl object-cover"
                src={`${baseURL}${stage.picture}`}
                alt={stage.title}
              />
            )}
            {stage.video && (
              <video
                className="aspect-video w-full rounded-xl object-cover"
                controls
              >
                <source src={`${baseURL}${stage.video}`} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            )}
            <p className="mt-5 whitespace-pre-line text-[15px] leading-7 text-[#4C4743]">
              {stage.description}
            </p>
          </div>
        </article>

        <nav
          className="mt-5 flex gap-3 overflow-x-auto pb-2"
          aria-label="Etapas do guia"
        >
          {guide.stages.map((item, index) => {
            const active = index === currentStage;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentStage(index)}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                  active
                    ? "border-icon bg-icon text-white"
                    : "border-black/10 bg-white text-[#79716B] hover:border-icon/40"
                }`}
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full ${active ? "bg-white/20" : "bg-[#F1F0EF]"}`}
                >
                  {index + 1}
                </span>
                <span className="max-w-32 truncate">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </section>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-black/10 bg-white px-6 py-3">
        <div className="mx-auto flex max-w-3xl justify-between">
          <button
            disabled={isFirst}
            onClick={() => setCurrentStage((value) => value - 1)}
            className="rounded-xl border border-black/10 px-5 py-3 text-sm text-[#79716B] transition hover:bg-black/[.03] disabled:cursor-not-allowed disabled:opacity-35"
          >
            ‹&nbsp;&nbsp; Anterior
          </button>
          <button
            onClick={next}
            className="rounded-xl bg-icon px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            {isLast ? "Concluir" : "Próximo"}&nbsp;&nbsp; ›
          </button>
        </div>
      </footer>
    </main>
  );
}
