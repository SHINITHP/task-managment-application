import { MembersPage } from "@/components/members-table";
import { getAllAgents } from "@/api/agentApi";
import type { IAgent } from "@/types";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);

  useEffect(() => {
    const fetchAllAgents = async () => {
      try {
        const { data } = await getAllAgents();
        console.log(data)
        setAgents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllAgents();
  }, []);

  return (
    <div>
      <MembersPage initialData={agents} />
    </div>
  );
};

export default Dashboard;
