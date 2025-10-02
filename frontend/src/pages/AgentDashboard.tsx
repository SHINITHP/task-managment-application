import { getTasksById } from "@/api/TaskApi";
import { Input } from "@/components/ui/input";
import AuthContext from "@/context/AuthContext";
import type { ITask } from "@/types";
import { Edit, Search, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/pagination";

const AgentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  const agentId = user.userId;

  useEffect(() => {
    const fetchAllAgents = async () => {
      try {
        const { data } = await getTasksById(agentId);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllAgents();
  }, []);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const filteredUsers = tasks.filter(
    (task) =>
      task.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.notes?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (page - 1) * pageSize;
  const paginatedData = filteredUsers.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="container">
        <header className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            Team Members
          </h1>
          <p className="text-sm md:text-md text-muted-foreground">
            Manage and view all team members
          </p>
        </header>

        <div className="bg-background rounded-lg shadow-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-input"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <Table className="min-w-[1150px] table-fixed w-full">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-1/3 h-12 text-muted-foreground">
                    FirstName
                  </TableHead>
                  <TableHead className="w-1/3 text-muted-foreground">
                    Phone
                  </TableHead>
                  <TableHead className="w-1/3 text-muted-foreground">
                    Notes
                  </TableHead>
                  <TableHead className="w-[100px] text-muted-foreground text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow className="h-14">
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground"
                    >
                      No tasks found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((task) => (
                    <TableRow
                      key={task._id}
                      className="border-border h-20 hover:bg-muted/30"
                    >
                      <TableCell className="w-1/6 text-muted-foreground">
                        {task.firstName || "-"}
                      </TableCell>
                      <TableCell className="w-1/6 text-muted-foreground">
                        {task.phone || "-"}
                      </TableCell>
                      <TableCell className="w-1/6 text-muted-foreground">
                        {task.notes || "-"}
                      </TableCell>

                      <TableCell className="w-[100px] text-center">
                        <div className="flex items-center justify-center gap-3">
                          <Edit className="text-blue-600 w-5 h-5 cursor-pointer hover:text-blue-800" />
                          <Trash2 className="text-red-600 w-5 h-5 cursor-pointer hover:text-red-800" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(filteredUsers.length / pageSize)}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default AgentDashboard;
