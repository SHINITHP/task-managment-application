import { Request, Response } from "express";
import { parseFile } from "../utils/csvParser.js";
import { distributeTask } from "../utils/taskDistributor.js";
import Task from "../models/Task.js";
import fs from "fs";

export const uploadAndDistribute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const filePath = req.file?.path;

  if (!filePath) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  try {
    // Parse data
    const taskData = await parseFile(filePath);

    // Distribute & Save task
    const savedTasks = await distributeTask(taskData);

    // remove the file after processing
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: `Successfully distributed ${taskData.length} tasks among agents`,
      tasks: savedTasks,
    });
  } catch (error) {
    // remove the file on error
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Task upload error:", error);
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const agents = await Task.find({}).populate("agentId", "-password");
    res.json(agents);
  } catch (error) {
    console.error("Fetch all agents error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
