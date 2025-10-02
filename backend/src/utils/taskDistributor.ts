import Task from "../models/Task.js";
import { ITask, TaskData, UserRole } from "../types/index.js";
import { User } from "../models/User.js";

export const distributeTask = async (taskData: TaskData[]): Promise<ITask[]> => {
  const agents = await User.find({ role: UserRole.AGENT });
  if (!agents.length) {
    throw new Error("Agents are required for distribution");
  }

  const agentsCount = agents.length;
  const tasksPerAgent = Math.floor(taskData.length / agentsCount);
  const remainder = taskData.length % agentsCount;

  let taskIndex = 0;
  let allSavedTasks: ITask[] = [];

  for (let i = 0; i < agentsCount; i++) {
    const agentTasksCount = tasksPerAgent + (i < remainder ? 1 : 0);
    const agentTasks: TaskData[] = [];

    for (let j = 0; j < agentTasksCount; j++) {
      if (taskIndex < taskData.length) {
        agentTasks.push(taskData[taskIndex]);
        taskIndex++;
      }
    }

    if (!agentTasks.length) continue;

    const tasksToSave = agentTasks.map(
      (data) =>
        new Task({
          firstName: data.firstName,
          phone: data.phone,
          notes: data.notes,
          agentId: agents[i]._id,
        })
    );

    const savedTasks = await Task.insertMany(tasksToSave);
    allSavedTasks.push(...savedTasks);

    const taskIds = savedTasks.map((task) => task._id);
    await User.findByIdAndUpdate(agents[i]._id, {
      // $push: { taskIds: { $each: taskIds } },
      // OR use $addToSet to avoid duplicates:
      $addToSet: { taskIds: { $each: taskIds } }
    });
  }

  return allSavedTasks;
};
