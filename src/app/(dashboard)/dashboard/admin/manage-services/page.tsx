import type { Metadata } from "next";
import ManageServicesTable from "@/components/dashboard/admin/ManageServicesTable";
import { IService } from "@/type/service";

export const metadata: Metadata = {
  title: "Manage Services | SalonBook",
  description: "View and manage all services offered by your salon.",
};

const ManageservicePage = async() => {
  let serviceItem:IService[]=[];
  const res = await fetch("http://localhost:8000/admin/services", {
    next: { revalidate: 60 },
  });
  const serviceData = await res.json();
  serviceItem = serviceData.data;

  console.log(serviceItem);

  return <ManageServicesTable serviceItem={serviceItem} />;
};

export default ManageservicePage;
