import { Suspense } from "react";

import ManageServicesTable from "@/components/dashboard/admin/ManageServicesTable";
import { API_BASE_URL } from "@/lib/api";
import type { IService } from "@/type/service";

async function ServicesData() {
  const res = await fetch(`${API_BASE_URL}/admin/services`, {
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  const serviceData = await res.json();

  const serviceItem: IService[] = Array.isArray(serviceData.data)
    ? serviceData.data
    : [];

  return <ManageServicesTable serviceItem={serviceItem} />;
}

export default function ManageServicePage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-gray-500">Loading services...</div>
      }
    >
      <ServicesData />
    </Suspense>
  );
}
