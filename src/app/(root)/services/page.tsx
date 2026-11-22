import BrowsService from "@/components/BrowsService";
import { IService } from "@/type/service";
import { Suspense } from "react";

const ServicesPage = async () => {
  let serviceData: IService[] = [];

  try {
    const res = await fetch("http://localhost:8000/services", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }

    const result = await res.json();

    serviceData = result.data || [];

    console.log("Our services:", serviceData);
  } catch (error) {
    console.error("Service fetching error:", error);
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Explore Our Services
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Discover our professional services, designed to give you the best
            experience.
          </p>
        </div>

        {/* Service Cards, Search & Dropdown */}
        {serviceData.length > 0 ? (
          <Suspense fallback={<p>Loading services...</p>}>
            <BrowsService services={serviceData} />
          </Suspense>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No Services Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Currently, there are no services available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
