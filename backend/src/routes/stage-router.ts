import { Router } from "express";
import { upload } from "../config/upload.js";
import { StageController } from "../controllers/stage-controller.js";

const stageRouter = Router();
const stageController = new StageController();

stageRouter.post(
  "/",
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  stageController.create,
);

export { stageRouter };