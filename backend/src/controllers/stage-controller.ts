import { unlink } from "node:fs/promises";
import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

type UploadedFiles = Record<string, Express.Multer.File[]>;

function getUploadedFiles(request: Request) {
  const files = request.files as UploadedFiles | undefined;

  return {
    picture: files?.picture?.[0],
    video: files?.video?.[0],
  };
}

async function removeUploadedFiles(
  files: Array<Express.Multer.File | undefined>,
) {
  await Promise.all(
    files.map(async (file) => {
      if (!file) return;
      await unlink(file.path).catch(() => undefined);
    }),
  );
}

class StageController {
  async create(request: Request, response: Response) {
    const { picture, video } = getUploadedFiles(request);

    try {
      const bodySchema = z.object({
        title: z.string().min(3, "Informe um título válido."),
        description: z.string().min(3, "Informe uma descrição válida."),
        time: z.string().min(1, "Informe o tempo estimado."),
        guideId: z.uuid("Guia inválido."),
      });

      const { title, description, time, guideId } = bodySchema.parse(
        request.body,
      );

      const guideExists = await prisma.guide.findUnique({
        where: { id: guideId },
        select: { id: true },
      });

      if (!guideExists) {
        throw new AppError("Guia não encontrado.", 404);
      }

      const stage = await prisma.stage.create({
        data: {
          title,
          description,
          time,
          guideId,
          picture: picture ? `/uploads/${picture.filename}` : null,
          video: video ? `/uploads/${video.filename}` : null,
        },
      });

      return response.status(201).json(stage);
    } catch (error) {
      await removeUploadedFiles([picture, video]);
      throw error;
    }
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const stages = await prisma.stage.findMany({
      where: { guideId: id },
    });

    return response.json(stages);
  }
}

export { StageController };
