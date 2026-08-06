import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post("/", categoryController.create);
categoryRouter.get("/", categoryController.index);

export { categoryRouter };
