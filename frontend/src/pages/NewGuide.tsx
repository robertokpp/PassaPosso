import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Textarea } from "../components/Textarea";

export function NewGuide() {
  return (
    <main className="flex flex-col">
      <header className="flex justify-between py-4 px-6 bg-white">
        <Button>Voltar</Button>
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
      </section>
    </main>
  );
}
