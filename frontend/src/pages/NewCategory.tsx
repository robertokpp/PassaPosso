import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";

import iconArrow from "../assets/icon-arrow.svg";
import iconCheck from "../assets/icon-check.svg";
import iconAdd from "../assets/icon-add.svg";

import { useNavigate } from "react-router";
import { useState } from "react";
import { z } from "zod";
import { Input } from "../components/Input";
import { api } from "../services/api";

const bodySchema = z.object({
  name: z.string().min(3, "Informe um categoria valida."),
});

export function NewCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  async function onSubmit() {
    const data = bodySchema.parse({
      name,
    });

    try {
      setIsSubmitting(true);

      await api.post("/category", data);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

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
      </Modal>
    </>
  );
}
