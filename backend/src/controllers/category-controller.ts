import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";

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
    const category = await prisma.category.findMany({});

    return response.json(category);
  }
}

export { CategoryController };
