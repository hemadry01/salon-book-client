"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import DashboardsidebarFooter from "./DashboardsidebarFooter";
import DashboardsidebarHeader from "./DashboardsidebarHeader";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BriefcaseBusiness,
  CalendarDays,
  LayoutDashboard,
  PlusCircle,
  Receipt,
  UserRound,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { TDashboardSidebarItem, TUser, TUserRole } from "@/type";
import Link from "next/link";

const isActivePath = (pathname: string, href: string) =>
  href === "/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

const roleBaseSidebarItem = {
  user: [
    {
      title: "Overview",
      href: "/dashboard/user/overview",
      icon: LayoutDashboard,
    },
    {
      title: "My Appointments",
      href: "/dashboard/user/my-appointments",
      icon: CalendarDays,
    },
    {
      title: "My Profile",
      href: "/dashboard/user/profile",
      icon: UserRound,
    },
  ],
  admin: [
    {
      title: "Overview",
      href: "/dashboard/admin/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Services",
      href: "/dashboard/admin/manage-services",
      icon: BriefcaseBusiness,
    },
    {
      title: "Add Service",
      href: "/dashboard/admin/manage-service/add-service",
      icon: PlusCircle,
    },
    {
      title: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },
    {
      title: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: Receipt,
    },
    {
      title: "My Profile",
      href: "/dashboard/admin/profile",
      icon: UserRound,
    },
  ],
};

const DashboardSidebar = ({ user: userProp }: { user?: TUser | null }) => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  // On mobile the sidebar is a sheet; close it after navigating.
  const closeMobile = () => setOpenMobile(false);

  const { data: session } = authClient.useSession();
  const user = (session?.user as TUser | undefined) ?? userProp;

  const role = user?.role || "user";
  const sidebarItems = roleBaseSidebarItem[role as TUserRole] ?? [];

  return (
    <Sidebar collapsible="icon">
      <DashboardsidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                sidebarItems.map((items: TDashboardSidebarItem) =>{
                  const{title,href,icon:Icon}=items;
                  return (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton
                        tooltip={title}
                        isActive={isActivePath(pathname, href)}
                        render={<Link href={href} onClick={closeMobile} />}
                      >
                        <Icon/>
                        <span>{title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <DashboardsidebarFooter />
    </Sidebar>
  );
};

export default DashboardSidebar;
