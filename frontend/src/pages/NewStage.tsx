import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { api } from "../services/api";

import iconArrow from "../assets/icon-arrow.svg";

const bodySchema = z.object({
  title: z.string().min(3, "Informe um título com pelo menos 3 caracteres."),
  description: z
    .string()
    .min(3, "Informe uma descrição com pelo menos 3 caracteres."),
  time: z.string().min(1, "Informe o tempo estimado."),
  guideId: z.uuid("Guia inválido."),
});

type MediaType = "none" | "picture" | "video";

export function NewStage() {
  const navigate = useNavigate();
  const { guideId } = useParams<{ guideId: string }>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("0");
  const [mediaType, setMediaType] = useState<MediaType>("none");
  const [picture, setPicture] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function selectMedia(type: MediaType) {
    setMediaType(type);
    setErrorMessage(null);

    if (type !== "picture") setPicture(null);
    if (type !== "video") setVideo(null);
  }

  function selectPicture(file: File | undefined) {
    if (file && !file.type.startsWith("image/")) {
      setPicture(null);
      setErrorMessage("Selecione um arquivo de imagem válido.");
      return;
    }

    setPicture(file ?? null);
    setErrorMessage(null);
  }

  function selectVideo(file: File | undefined) {
    if (file && !file.type.startsWith("video/")) {
      setVideo(null);
      setErrorMessage("Selecione um arquivo de vídeo válido.");
      return;
    }

    setVideo(file ?? null);
    setErrorMessage(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    try {
      setIsSubmitting(true);

      const fields = bodySchema.parse({
        title,
        description,
        time,
        guideId,
      });

      if (mediaType === "picture" && !picture) {
        throw new Error("Selecione uma imagem.");
      }

      if (mediaType === "video" && !video) {
        throw new Error("Selecione um vídeo.");
      }

      const data = new FormData();
      data.append("title", fields.title);
      data.append("description", fields.description);
      data.append("time", fields.time);
      data.append("guideId", fields.guideId);

      if (picture) data.append("picture", picture);
      if (video) data.append("video", video);

      await api.post("/stage", data);

      setTitle("");
      setDescription("");
      setTime("0");
      selectMedia("none");

      alert("Etapa cadastrada com sucesso.");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.issues[0]?.message ?? "Dados inválidos.");
        return;
      }

      if (axios.isAxiosError<{ message?: string }>(error)) {
        setErrorMessage(
          error.response?.data?.message ?? "Não foi possível cadastrar a etapa.",
        );
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
      );
      
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-col">
      <form onSubmit={onSubmit}>
        <header className="flex items-center justify-between bg-white px-6 py-4">
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            <img src={iconArrow} alt="Ícone de flecha" />
            Cancelar
          </Button>
          <strong>Nova etapa</strong>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar etapa"}
          </Button>
        </header>

        <section className="h-fit w-full space-y-6 bg-background px-6 py-8">
          <div className="rounded-2xl bg-white p-6">
            <div className="space-y-4">
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                legend="Título da etapa *"
              />

              <Textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                legend="Descrição / instrução *"
                rows={4}
              />

              <Input
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-1/2"
                type="number"
                min={0}
                legend="Tempo estimado (minutos) *"
              />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-6">
            <strong>Mídia</strong>

            <div className="flex gap-4">
              <Button
                type="button"
                className="w-full"
                variant={mediaType === "none" ? "primary" : "secondary"}
                onClick={() => selectMedia("none")}
              >
                Nenhuma
              </Button>
              <Button
                type="button"
                className="w-full"
                variant={mediaType === "picture" ? "primary" : "secondary"}
                onClick={() => selectMedia("picture")}
              >
                Foto
              </Button>
              <Button
                type="button"
                className="w-full"
                variant={mediaType === "video" ? "primary" : "secondary"}
                onClick={() => selectMedia("video")}
              >
                Vídeo
              </Button>
            </div>

            {mediaType === "picture" && (
              <label className="block space-y-2 text-sm text-[#79716B]">
                <span>Selecione uma imagem de até 20 MB</span>
                <input
                  className="block w-full rounded-xl border border-[#E7E5E4] p-3"
                  type="file"
                  accept="image/*"
                  onChange={(event) => selectPicture(event.target.files?.[0])}
                />
              </label>
            )}

            {mediaType === "video" && (
              <label className="block space-y-2 text-sm text-[#79716B]">
                <span>Selecione um vídeo de até 20 MB</span>
                <input
                  className="block w-full rounded-xl border border-[#E7E5E4] p-3"
                  type="file"
                  accept="video/*"
                  onChange={(event) => selectVideo(event.target.files?.[0])}
                />
              </label>
            )}

            {errorMessage && (
              <p role="alert" className="text-sm text-red-600">
                {errorMessage}
              </p>
            )}
          </div>
        </section>
      </form>
    </main>
  );
}
