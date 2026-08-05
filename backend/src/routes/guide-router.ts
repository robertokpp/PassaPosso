import { Router } from "express";
import { GuideController } from "@/controllers/guide-controller";

const guideRouter = Router();
const guideController = new GuideController();

guideRouter.post("/", guideController.create);

export { guideRouter };
