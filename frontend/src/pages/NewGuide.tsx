import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {  z } from "zod";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Textarea } from "../components/Textarea";

import iconArrow from "../assets/icon-arrow.svg";
import iconAddOrange from "../assets/icon-addOrange.svg";

import { api } from "../services/api";

interface Category {
  id: string;
  name: string;
}

const bodySchema = z.object({
  title: z.string().min(3, "Informe um titulo valida."),
  description: z.string().min(3, "Informe uma descrição valida."),
  categoryId: z.uuid(),
});

export function NewGuide() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const response = await api.post("/guide", data);

      setTitle("");
      setDescription("");
      setCategoryId("");

      navigate(`/nova-etapa/${response.data}`);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <main className="flex flex-col">
      <header className="flex justify-between bg-white px-6 py-4">
        <Button variant="secondary" onClick={() => navigate("/")}>
          <img src={iconArrow} alt="Ícone de flecha" />
          Voltar
        </Button>

        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar guia"}
        </Button>
      </header>

      <section className="h-fit w-full bg-background px-6 py-8">
        <div className="rounded-2xl bg-white p-6">
          <strong>Informações do guia</strong>

          <div>
            <Input
              legend="Título *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              legend="Descrição"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Select
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
        </div>

        <Button
          variant="secondary"
          className="text-icon"
          onClick={() => navigate("/nova-etapa")}
        >
          <img src={iconAddOrange} alt="Ícone de adicionar" />
          Adicionar etapa
        </Button>
      </section>
    </main>
  );
}
