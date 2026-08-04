import { Card } from "../components/Card";
import { Header } from "../components/Header";

export function Home() {
  return (
    <main className=" bg-[#F7F3EE] h-screen">
      <Header></Header>
      <section className="px-6">

      <Card></Card>
      </section>
    </main>
  );
}
