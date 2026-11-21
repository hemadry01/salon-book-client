

import OverviewStats from "@/components/dashboard/admin/OverviewStats";
import { Suspense } from "react";

const OverviewPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          A quick snapshot of your salon&apos;s performance.
        </p>
      </header>

      <Suspense fallback={<p>Loading dashboard statistics...</p>}>
        <OverviewStats />
      </Suspense>
    </div>
  );
};

export default OverviewPage;
