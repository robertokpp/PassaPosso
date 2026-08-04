import { Button } from "./Button";

export function Card() {
  return (
    <div className="w-full bg-white p-4">
      <div className="flex justify-between">
        <span>Culinária</span>
        <span>04/08/2026</span>
      </div>
      <strong>Como fazer pão francês</strong>
      <p>Aprenda a fazer um pão francês crocante por fora e macio por dentro</p>
      <div className="flex gap-2">
        <Button className="w-full justify-center">Visualizar</Button>
        <Button className="w-full justify-center">Editar</Button>
      </div>
    </div>
  );
}
