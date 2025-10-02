import { Router } from "express";
import { logout, refreshToken, signIn } from "../controllers/authController.js";
const router = Router();

router.post('/sign-in', signIn);
router.post('/refresh-token', refreshToken);
router.post("/logout", logout);

export default router;