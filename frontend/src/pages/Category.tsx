import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

import iconArrow from "../assets/icon-arrow.svg";
import iconCheck from "../assets/icon-check.svg";
import iconAdd from "../assets/icon-add.svg";

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
  name: string;
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

  async function handlerListCategory() {
    const response = await api.get("/category");
    setCategories(response.data);
  }

  useEffect(() => {
    handlerListCategory();
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
        <div className="flex flex-col gap-2">

        </div>
        {categories.map((category) => (
          <div className="bg-white rounded-2xl p-4">
            <p>{category.name}</p>
          </div>
        ))}
      </Section>

      <Modal
        tittle="Nova categoria"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
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
      </Modal>
    </>
  );
}
