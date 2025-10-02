import { Router } from "express";
import { getAllTasks, getTasksById, uploadAndDistribute } from "../controllers/taskController.js";
import { uploadMiddleware, validateFileUpload } from "../middleware/fileUploadMiddleware.js";
import { authenticate, restrictToAdmin } from "../middleware/authMiddleware.js";
const router = Router();

router.get('/',authenticate, getAllTasks);
router.get('/:agentId',authenticate, getTasksById);
router.post('/upload', authenticate, restrictToAdmin, uploadMiddleware, validateFileUpload, uploadAndDistribute);

export default router;