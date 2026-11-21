
import { Suspense } from "react";

import ManageServicesTable from "@/components/dashboard/admin/ManageServicesTable";
import type { IService } from "@/type/service";

async function ServicesData() {
  
  const res = await fetch("http://localhost:8000/admin/services", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  const serviceData = await res.json();

  const serviceItem: IService[] = serviceData.data ?? [];

  return <ManageServicesTable serviceItem={serviceItem} />;
}

// Main page
export default function ManageservicePage() {
  return (
    <div>
      <Suspense fallback={<p>Loading services...</p>}>
        <ServicesData />
      </Suspense>
    </div>
  );
}

