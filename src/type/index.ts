import { LucideIcon } from "lucide-react";

export type TUserRole = "admin" | "user";

export type TUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role?: TUserRole | null;
};

export type TDashboardSidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  role?: TUserRole[];
};