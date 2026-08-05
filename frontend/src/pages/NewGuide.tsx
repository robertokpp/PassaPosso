import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Textarea } from "../components/Textarea";

import iconArrow from "../assets/icon-arrow.svg";
import iconAddOrange from "../assets/icon-addOrange.svg"

import { useNavigate } from "react-router";

export function NewGuide() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col">
      <header className="flex justify-between py-4 px-6 bg-white">
        <Button
          variant="secondary"
          onClick={() => navigate("/")}
        >
          <img src={iconArrow} alt="icon de flecha" />
          Voltar
        </Button>
        <Button>Salvar guia</Button>
      </header>

      <section className="w-full h-fi px-6 py-8  bg-background">
        <div className="p-6 bg-white rounded-2xl">
          <strong>Informações do guia</strong>
          <form action="">
            <label htmlFor=""></label>

            <Input legend="Título *"></Input>
            <Textarea legend="Descrição" rows={4}></Textarea>
            <Select legend="Categoria" id="categorias">
              <option>teste 1</option>
              <option>teste 2</option>
              <option>teste 3</option>
              <option>teste 4</option>
            </Select>
          </form>
        </div>

        <Button variant="secondary" className="text-icon" onClick={()=> navigate("/nova-etapa")}>
          <img src={iconAddOrange} alt="Icon de add" />
          Adicionar etapa</Button>
      </section>
    </main>
  );
}
