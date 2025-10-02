import { Router } from "express";
import { createAgent, getAllAgents } from "../controllers/agentController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = Router();

router.get('/',authenticate, getAllAgents)
router.post('/create',authenticate, createAgent);



export default router;