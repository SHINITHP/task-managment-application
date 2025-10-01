import { MembersPage } from "@/components/members-table";

import { getAllAgents } from "@/api/agentApi";
import type { IAgent } from "@/types";
import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";

const Dashboard = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);

  useEffect(() => {
    const fetchAllAgents = async () => {
      try {
        const res: AxiosResponse<IAgent[]> = await getAllAgents();
        console.log('hi ',res);
        setAgents(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllAgents();
  }, []);

  return (
    <div>
      <MembersPage initialData={agents} />
      {/* <MembersPage /> */}
    </div>
  );
};

export default Dashboard;
