import type { Metadata } from "next";

import OverviewStats from "@/components/dashboard/admin/OverviewStats";

export const metadata: Metadata = {
  title: "Overview | SalonBook",
  description:
    "A quick snapshot of your salon's customers, services and appointments.",
};

const OverviewPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          A quick snapshot of your salon&apos;s performance.
        </p>
      </header>

      <OverviewStats />
    </div>
  );
};

export default OverviewPage;
