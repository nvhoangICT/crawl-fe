
import {
  ChevronRight
} from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { MenuItem } from "@/router/menu"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
export function NavProjects({
  projects,
}: {
  projects: MenuItem[]
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {projects.map((item, index) => (
          <React.Fragment key={index}>
            {item.items ? (
              <Collapsible
                asChild
                defaultOpen={item.items.some((subItem) => location.pathname === subItem.url)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.name} className="py-6" isActive={location.pathname === item.url}>
                      {item.icon && <item.icon />}
                      <span className="font-medium">{item.name}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.name}>
                          <SidebarMenuSubButton asChild className="py-5 cursor-pointer" isActive={location.pathname === subItem.url}  onClick={() => navigate(subItem?.url||"/")}>
                              <span>{subItem.name}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={index} className="py-0">
                <SidebarMenuButton
                  asChild
                  onClick={() => navigate(item?.url||"/")}
                  className={location.pathname === item.url ? "bg-highlight text-highlight-foreground" : ""}
                  isActive={location.pathname === item.url}
                >
                  <div className="flex items-center cursor-pointer py-6 font-medium  ">
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </React.Fragment>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

