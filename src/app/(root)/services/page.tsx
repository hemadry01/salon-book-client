import BrowsService from "@/components/BrowsService";
import { IService } from "@/type/service";
import React from "react";

const ServicesPage = async () => {
  let serviceData: IService[] = [];
  try {
    const res = await fetch("http://localhost:8000/services", {
      cache: "no-store",
    });

    const result = await res.json();
    serviceData = result.data;

    console.log("our service", serviceData);
  } catch (error) {
    console.log(error);
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

        {/* Service Cards */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceData.map((service) => {
            return <BrowsService key={service._id} service={service} />;
          })}
        </div>

        {/* Empty State */}
        {serviceData.length === 0 && (
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
