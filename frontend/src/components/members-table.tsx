import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Search, Trash2, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { CreateAgentModal } from "./create-agent-modal";
import type { IAgent } from "@/types";

interface MembersPageProps {
  initialData: IAgent[];
}

export const MembersPage = ({ initialData }: MembersPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(initialData);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUsers(initialData);
  }, [initialData]);

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("initialData", users);
  console.log("filteredUsers", filteredUsers);

  const handleInvite = async (data: {
    email: string;
    role: "ADMIN" | "AGENT";
  }) => {
    setIsLoading(true);
    try {
      setIsInviteModalOpen(false);
    } catch (error) {
      toast.error((error as Error).message || "Failed to send invitation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    setIsLoading(true);
    try {
    } catch (error) {
      toast.error((error as Error).message || "Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Team Members
          </h1>
          <p className="text-muted-foreground">
            Manage and view all team members
          </p>
        </header>

        <div className="bg-card rounded-lg shadow-lg border border-border">
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
              <Button
                onClick={() => setIsInviteModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                <UserPlus className="mr-2 h-4 w-4" /> Add Members
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-1/6 h-12 text-muted-foreground">
                    Name
                  </TableHead>
                  <TableHead className="w-1/6 text-muted-foreground">
                    Email
                  </TableHead>
                  <TableHead className="w-1/6 text-muted-foreground">
                    Phone
                  </TableHead>
                  <TableHead className="w-1/6 text-muted-foreground">
                    Role
                  </TableHead>
                  <TableHead className="w-1/4 text-muted-foreground">
                    Tasks
                  </TableHead>
                  <TableHead className="w-[100px] text-muted-foreground text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow className="h-14">
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground"
                    >
                      No members found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      className="border-border h-20 hover:bg-muted/30"
                    >
                      <TableCell className="w-1/6 text-muted-foreground">
                        {user.fullName || "-"}
                      </TableCell>
                      <TableCell className="w-1/6 text-muted-foreground">
                        {user.email || "-"}
                      </TableCell>
                      <TableCell className="w-1/6 text-muted-foreground">
                        {user.phone || "-"}
                      </TableCell>
                      <TableCell className="w-1/6 text-foreground">
                        {user.role || "-"}
                      </TableCell>
                      <TableCell className="w-1/4 text-muted-foreground">
                        <div className="max-h-16 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                          {user.tasks && user.tasks.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1">
                              {user.tasks.map((task, index) => (
                                <li
                                  key={index}
                                  className="text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                                  title={task}
                                >
                                  {task}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">
                              No tasks
                            </p>
                          )}
                        </div>
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
      <CreateAgentModal
        open={isInviteModalOpen}
        onOpenChange={setIsInviteModalOpen}
        onSave={handleInvite}
      />
    </div>
  );
};
