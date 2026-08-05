import { Card } from "../components/Card";
import { Header } from "../components/Header";

export function Home() {
  return (
    <main className=" bg-background h-full pb-6">
      <Header></Header>
      <section className="px-6">
        <div className="mt-4 flex flex-col gap-2">
          <Card></Card>
          <Card></Card>
        </div>
      </section>
    </main>
  );
}
