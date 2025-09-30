import { Router } from "express";
import { signIn } from "../controllers/authController.js";
const router = Router();

router.post('/sign-in', signIn);

export default router;