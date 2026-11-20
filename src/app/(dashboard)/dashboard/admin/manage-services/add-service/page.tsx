import type { Metadata } from "next";
import AddServiceForm from "@/components/dashboard/admin/AddServiceForm";

export const metadata: Metadata = {
  title: "Add Service | SalonBook",
  description: "Add a new service to your salon menu.",
};

const AddservicePage = () => {
  return <AddServiceForm />;
};

export default AddservicePage;
