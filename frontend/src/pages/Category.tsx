import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

import iconArrow from "../assets/icon-arrow.svg";
import iconCheck from "../assets/icon-check.svg";
import iconAdd from "../assets/icon-add.svg";
import iconTrash from "../assets/icon-trash-bin.svg";
import iconPen from "../assets/icon-pen.svg";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Input } from "../components/Input";
import { api } from "../services/api";
import { Section } from "../components/Section";

const bodySchema = z.object({
  name: z.string().min(3, "Informe um categoria valida."),
});

interface categories {
  id: string;
  name: string;
  guideTotal: number;
}

export function NewCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<categories[]>([]);

  async function onSubmit() {
    setErrorMessage(null);

    try {
      setIsSubmitting(true);
      const data = bodySchema.parse({
        name,
      });
      await api.post("/category", data);

      setName("");
      setIsOpen(false);
      fetchHandlerCategory();

      alert("Salvo com sucesso");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.issues[0]?.message ?? "Dados inválidos.");
        return;
      }
      return setErrorMessage("Não foi possível cadastra.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function fetchHandlerCategory() {
    const response = await api.get("/category");
    console.log(response.data);
    setCategories(response.data);
  }

  async function deleteCategory(id: string) {
    console.log(id);
    const confirmed = window.confirm("Deseja realmente deletar a categoria?");

    if (!confirmed) return;

    try {
      await api.delete(`/category/${id}`);

      alert("Deletado com sucesso.");
      fetchHandlerCategory();
    } catch (error) {
      console.error("Erro ao deletar a categoria:", error);
    }
  }

  useEffect(() => {
    fetchHandlerCategory();
  }, []);

  return (
    <>
      <Header>
        <Button variant="secondary" onClick={() => navigate("/")}>
          <img src={iconArrow} alt="Ícone de flecha" />
          Voltar
        </Button>
        <strong>Categorias</strong>
        <Button onClick={() => setIsOpen(true)}>
          <img src={iconAdd} alt="Ícone de check" />
          Nova categoria
        </Button>
      </Header>

      <Section>
        <div className="flex flex-col gap-2"></div>
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-between bg-white rounded-2xl p-4"
          >
            <div className="flex gap-4 items-center">
              <p>{category.name}</p>

              {category.guideTotal === 1 ? (
                <small className="text-[10px]">{`${category.guideTotal} guia`}</small>
              ) : (
                <small className="text-[10px]">{`${category.guideTotal} guias`}</small>
              )}
            </div>

            <div className="flex gap-1">
              <Button variant="secondary" className="p-1">
                <img src={iconPen} className="w-4 h-4 cursor-pointer" />
              </Button>

              {category.guideTotal === 0 && (
                <Button
                  variant="secondary"
                  className="p-1"
                  onClick={() => deleteCategory(category.id)}
                >
                  <img src={iconTrash} className="w-4 h-4 cursor-pointer" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </Section>

      <Modal
        tittle="Nova categoria"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <Input
            legend="nome *"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
          <Button onClick={onSubmit} className="w-full">
            <img src={iconCheck} alt="Ícone de check" />
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
          {errorMessage && (
            <p role="alert" className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}
