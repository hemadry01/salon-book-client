"use client";

import { IService } from "@/type/service";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { Clock, ArrowRight, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface IServiceProps {
  services: IService[];
}

const BrowsService = ({ services }: IServiceProps) => {

  const{data:session} = authClient.useSession();
  const user = session?.user;

  const router = useRouter();
  const serarchParams = useSearchParams();

  const searchTerm = serarchParams.get("search") || "";
  const selectedCategory = serarchParams.get("category") || "All";

  const updateSearchParams =(key: string, value: string)=>{
    const params = new URLSearchParams(serarchParams.toString());

    if(!value || value === "All"){
      params.delete(key);
    }else{
      params.set(key, value);
    }
    const queryString = params.toString();
    router.replace(queryString ? `/services?${queryString}` : "/services",{scroll:false});
    
  }

  // Get unique categories
  const categories = useMemo(() => {
    return ["All", ...new Set(services.map((service) => service.category))];
  }, [services]);

  // Filter services
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  const handleViewDetails = (id: string) => {
    if(!user){
      router.push(`/sign-in?redirectTo=/services/${id}`);
      return
    }
  };

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Search and Category Dropdown */}
      <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Search Field */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <Input
              type="text"
              placeholder="Search service by name..."
              value={searchTerm}
              onChange={(e) => updateSearchParams("search", e.target.value)}
              className="h-12 pl-10"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => updateSearchParams("category", e.target.value)}
            className="h-12 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card
              key={service._id}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Service Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <CardHeader className="space-y-3">
                <div>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-blue-50 px-3 py-1 text-blue-600"
                  >
                    {service.category}
                  </Badge>
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {service.name}
                </h2>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                  {service.description}
                </p>

                {/* Price & Duration */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Service Price</p>
                    <p className="text-xl font-bold text-blue-600">
                      ৳{service.price}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="mb-1 text-xs text-gray-500">Duration</p>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      <Clock size={16} />
                      {service.duration}
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* View Details */}
              <CardFooter>
                {/* <Button className="group h-12 w-full rounded-xl bg-rose-500 px-6 py-2.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
                  <Link
                    href={`/services/${service._id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button> */}
                <Button
                  onClick={() => handleViewDetails(service._id)}
                  className="group h-12 w-full rounded-xl bg-rose-500 px-6 py-2.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white py-16 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700">
            No Services Found!
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Try another service name or category.
          </p>
        </div>
      )}
    </section>
  );
};

export default BrowsService;
