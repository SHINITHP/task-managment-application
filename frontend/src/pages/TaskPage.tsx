import { getAllTasks } from "@/api/TaskApi";
import TaskTable from "@/components/tasks-table";
import type { ITask } from "@/types";
import { useEffect, useState } from "react";

const TaskPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
      const fetchAllAgents = async () => {
        try {
          const { data } = await getAllTasks();
          console.log(data)
          setTasks(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchAllAgents();
    }, []);
  
  
  return (
    <>
      <TaskTable initialData={tasks}/>
    </>
  );
};

export default TaskPage;
