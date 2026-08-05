import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/lib/prisma";
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

    return response.json(guide);
  }
}

export { GuideController };
