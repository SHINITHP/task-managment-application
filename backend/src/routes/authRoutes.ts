import { Router } from "express";
import { refreshToken, signIn } from "../controllers/authController.js";
const router = Router();

router.post('/sign-in', signIn);
router.post('/refresh-token', refreshToken);

export default router;