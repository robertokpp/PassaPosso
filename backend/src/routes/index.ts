import { Router } from "express";
//import { ensureAuthenticated } from "@/middlewares/ensure_authenticated";

import { categoryRouter } from "./category-routes.js";
import { guideRouter } from "./guide-router.js";

const router = Router();

//Rotas publicas
router.use("/category", categoryRouter);
router.use("/guide", guideRouter);

// Routes private
//router.use(ensureAuthenticated);
//router.use("/");

export { router };
