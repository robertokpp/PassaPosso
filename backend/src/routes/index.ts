import { Router } from "express";
//import { ensureAuthenticated } from "@/middlewares/ensure_authenticated";

import { categoryRouter } from "./category-routes.js";
import { stageRouter } from "./stage-router.js";
import { guideRouter } from "./guide-router.js";

const router = Router();

//Rotas publicas
router.use("/category", categoryRouter);
router.use("/guide", guideRouter);
router.use("/stage", stageRouter)


// Routes private
//router.use(ensureAuthenticated);
//router.use("/");

export { router };
