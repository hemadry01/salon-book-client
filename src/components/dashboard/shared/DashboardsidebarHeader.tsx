"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardsidebarHeader = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  return (
    <div className="flex items-center border-b pb-4 gap-3 ">
      <Avatar>
        <AvatarImage
          src={user?.image ?? undefined}
          alt={user?.name ?? "User"}
        />
        <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col group-data-[collapsible=icon]:hidden">
        <span className="text-sm font-medium">{user?.name}</span>

        <span className="text-xs text-muted-foreground">{user?.email}</span>
        <span className="text-xs text-muted-foreground">{user?.role}</span>
      </div>
    </div>
  );
};

export default DashboardsidebarHeader;
