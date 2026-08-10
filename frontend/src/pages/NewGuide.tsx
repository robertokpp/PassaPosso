import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { z } from "zod";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Textarea } from "../components/Textarea";
import { Section } from "../components/Section";

import iconArrow from "../assets/icon-arrow.svg";
import iconAddOrange from "../assets/icon-addOrange.svg";

import { api } from "../services/api";

interface Category {
  id: string;
  name: string;
}

interface Stage {
  id: string;
  title: string;
  description: string;
  time: string;
}

const bodySchema = z.object({
  title: z.string().min(3, "Informe um titulo valida."),
  description: z.string().min(3, "Informe uma descrição valida."),
  categoryId: z.uuid(),
});

export function NewGuide() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [Stages, setStages] = useState<Stage[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  async function fetchGuide() {
    const response = await api.get(`/guide/${id}`);
    setTitle(response.data.title);
    setDescription(response.data.description);
    setCategoryId(response.data.category.id);
  }

  async function fetchStage() {
    const response = await api.get(`/stage/guide/${id}`);
    setStages(response.data);
  }

  async function loadCategories() {
    const response = await api.get<Category[]>("/category");
    setCategories(response.data);
  }

  async function onSubmit() {
    try {
      setIsSubmitting(true);
      const data = bodySchema.parse({
        title,
        description,
        categoryId,
      });

      if (!id) {
        const response = await api.post("/guide", data);
        setTitle("");
        setDescription("");
        setCategoryId("");
        navigate(`/nova-etapa/${response.data}`);
        return;
      }

      if (id) {
        const response = await api.patch(`/guide/${id}`, data);

        alert("Atualizado com Sucesso.");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (id) {
      fetchGuide();
      fetchStage();
    }
  }, [id]);

  return (
    <main className="flex flex-col">
      <header className="flex justify-between bg-white px-6 py-4">
        <Button variant="tertiary" onClick={() => navigate("/")}>
          <img src={iconArrow} alt="Ícone de flecha" />
          Voltar
        </Button>

        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar guia"}
        </Button>
      </header>

      <Section>
        <div className="rounded-2xl bg-white p-6 flex flex-col gap-4">
          <strong className="text-[24px]">Informações do guia</strong>

          <Input
            required
            legend="Título *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            required
            legend="Descrição"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            required
            legend="Categoria"
            id="categorias"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        {id && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <strong>Etapas</strong>
                <span className="text-[#1C1917]/50">{` (${Stages.length})`}</span>
              </div>
              <Button
                variant="secondary"
                className="text-icon"
                onClick={() => navigate(`/nova-etapa/${id}`)}
              >
                <img src={iconAddOrange} alt="Ícone de adicionar" />
                Adicionar etapa
              </Button>
            </div>
            {Stages.map((stage, index) => (
              <div className="w-ful rounded-2xl p-4 bg-white flex gap-4">
                <div className="w-8 h-8 bg-icon p-1 flex items-center justify-center rounded-full">
                  {index + 1}
                </div>
                <div>
                  <strong>{stage.title}</strong>
                  <p>{stage.description}</p>
                  <small>{`${stage.time} min`}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
