import * as React from "react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getMenu } from "@/router/menu";
import useAuth from "@/store/useAuth";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentUser } = useAuth();
  const menu = getMenu(currentUser?.permissions);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-0">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
