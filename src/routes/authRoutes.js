import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/authController.js";
import validateSignUp from "../schemas/validateSignUp.js";
import validateSingIn from "../schemas/validateSignIn.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.post("/sign-up", validateSignUp, signUp);
router.post("/sign-in", validateSingIn, signIn);
router.delete("/sign-out", validateToken, signOut);

export default router;