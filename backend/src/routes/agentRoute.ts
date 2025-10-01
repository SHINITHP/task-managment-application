import { Router } from "express";
import { createAgent, getAllAgents } from "../controllers/agentController.js";
const router = Router();

router.get('/', getAllAgents)
router.post('/create', createAgent);



export default router;