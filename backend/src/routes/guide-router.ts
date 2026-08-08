import { Router } from "express";
import { GuideController } from "../controllers/guide-controller.js";

const guideRouter = Router();
const guideController = new GuideController();

guideRouter.post("/", guideController.create);
guideRouter.get("/", guideController.index);
guideRouter.get("/:id", guideController.show);

export { guideRouter };
