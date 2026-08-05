import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Textarea } from "../components/Textarea";

export function NewStage() {
  return (
    <main className="flex flex-col">
      <header className="flex justify-between py-4 px-6 bg-white items-center">
        <Button>Cancelar</Button>
        <strong>Nova etapa</strong>
        <Button>Salvar etapa</Button>
      </header>

      <section className="w-full h-fi px-6 py-8  bg-background">
        <div className="p-6 bg-white rounded-2xl">
          <form action="">
            <Input legend="Título da etapa *"></Input>
            <Textarea legend="Descrição / instrução" rows={4}></Textarea>
            <Input className="w-1/2" legend="Tempo estimado (minutos)"></Input>
          </form>
        </div>

        <div className="p-6 bg-white rounded-2xl">
          <strong>Mídia</strong>
          <form action="">
            <div className="flex justify-between gap-4">
              <Button className="w-full">Nenhuma</Button>
              <Button className="w-full">Foto</Button>
              <Button className="w-full">Vídeo</Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
