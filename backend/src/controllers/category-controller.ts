import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import { nativeEnum } from "zod/v3";

class CategoryController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().min(3),
    });

    const { name } = bodySchema.parse(request.body);

    await prisma.category.create({
      data: {
        name,
      },
    });

    return response.json();
  }

  async index(request: Request, response: Response) {
    const category = await prisma.category.findMany({
      include: { guides: true },
    });

    const responseCategory = category.map((item) => ({
      id: item.id,
      name: item.name,
      guideTotal: item.guides.length,
    }));

    return response.json(responseCategory);
  }

  async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.category.delete({
      where: { id },
    });

    return response.json("deletado com sucesso");
  }
}

export { CategoryController };
