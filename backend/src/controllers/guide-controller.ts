import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";

class GuideController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().min(3, "Informe um titulo valido!"),
      description: z.string().min(3, "Informe um descrição valida!"),
      categoryId: z.string(),
    });

    const { title, description, categoryId } = bodySchema.parse(request.body);

    const categoryIdVerify = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryIdVerify) {
      throw new AppError("Category invalida!");
    }

    const guide = await prisma.guide.create({
      data: {
        title,
        description,
        categoryId,
      },
    });

    return response.json(guide.id);
  }

  async index(request: Request, response: Response) {
    const guideResponse = await prisma.guide.findMany({
      include: { category: true },
    });

    const guide = guideResponse.map((guide) => ({
      id: guide.id,
      title: guide.title,
      description: guide.description,
      category: guide.category.name,
      data: guide.updatedAt,
    }));

    return response.json(guide);
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const guide = await prisma.guide.findUnique({
      where: { id },
      include: { category: true, stages: true}
    });

    if (!guide) {
      throw new AppError("Guia não encontrada!", 404);
    }

    return response.json(guide);
  }
}

export { GuideController };
