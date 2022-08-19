import { Router } from "express";
import { getUserByName } from "../controllers/usersController.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.get("/search/:user", validateToken, getUserByName);

export default router;