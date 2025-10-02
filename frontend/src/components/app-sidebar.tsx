import { Home, Inbox, Settings, Timer } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Tasks",
    url: "/admin/task",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      side="left"
      className="dark:bg-background "
    >
      <SidebarHeader className="py-5 h-20">
        <SidebarMenu className="h-full">
          <SidebarMenuItem>
            <SidebarMenuButton
              className="hover:!bg-transparent focus:!bg-transparent active:!bg-transparent"
            >
              <Timer className="w-10 h-10 shrink-0" />
              <span className="text-lg">Task-Management</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="py-5"
                    asChild
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
