import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Section } from "../components/Section";

import iconArrow from "../assets/icon-arrow.svg";

import { useNavigate, useParams } from "react-router";

export function ViewerGuide() {
  const navigate = useNavigate();
  const id = useParams();


  return (
    <>
      <Header>
        <Button variant="tertiary" onClick={() => navigate("/")}>
          <img src={iconArrow} alt="Ícone de flecha" />
          Voltar
        </Button>
      </Header>

      <Section>
        <div className="bg-icon w-full px-4"></div>
        <div></div>
      </Section>
    </>
  );
}
