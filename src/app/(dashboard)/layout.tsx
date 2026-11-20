import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from '@/components/dashboard/shared/DashboardSidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="min-w-0 flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;