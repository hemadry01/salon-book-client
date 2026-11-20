
 "use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { authClient} from '@/lib/auth-client';
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import React from 'react';
import { ChevronsUpDown, House, LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import { toast } from '@/components/ui/toast';

const DashboardsidebarFooter = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

   const { isMobile, setOpenMobile } = useSidebar();
  // On mobile the sidebar is a sheet; close it after navigating.
  const closeMobile = () => setOpenMobile(false);

    const handleSignOut = async()=>{
        try {
          const { error } = await authClient.signOut();

          if (error) {
            toast.add({
              type: "error",
              title: "Sign out failed!",
              description:
                error instanceof Error
                  ? error.message
                  : "Something went wrong. Please try again.",
            });
          }

          toast.add({
            title: "success",
            description: "Successfully sign out!.",
          });
        } catch (error) {
          toast.add({
            type: "error",
            title: "Something went wrong!",
            description:
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again.",
          });
        }
    }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                />
              }
            >
              <Avatar className="rounded-lg after:rounded-lg">
                {/* <AvatarImage
                        src={user?.image ?? undefined}
                        alt={user?.name}
                        className="rounded-lg"
                    /> */}
                <AvatarFallback className="rounded-lg">
                  {user?.name.slice(0, 2).toLowerCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs text-sidebar-foreground/70">
                  {user?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="min-w-56"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="truncate">
                  {/* Signed in as {role || "user"} */}
                </DropdownMenuLabel>
                <DropdownMenuItem
                  render={<Link href="/" onClick={closeMobile} />}
                >
                  <House />
                  Back to site
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={
                    <Link
                      href="/dashboard/admin/profile"
                      onClick={closeMobile}
                    />
                  }
                >
                  <UserRound />
                  My profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};;

export default DashboardsidebarFooter;