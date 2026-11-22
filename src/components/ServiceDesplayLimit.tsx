"use client"
import { IService } from '@/type/service'; 
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@base-ui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface IServiceProps {
  service:IService
}

const ServiceDesplayLimit = ({ service }:IServiceProps) => {

     const{data:session} = authClient.useSession();
        const user = session?.user;
      
        const router = useRouter();

    const handleViewDetails = (id: string) => {
      if (!user) {
        router.push(`/sign-in?redirectTo=/services/${id}`);
        return;
      }

      router.push(`/services/${id}`);
    };
     
  return (
    <Card
      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Service Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <CardHeader className="space-y-3">
        {/* Category */}
        <div>
          <Badge
            variant="secondary"
            className="rounded-full bg-blue-50 px-3 py-1 text-blue-600"
          >
            {service.category}
          </Badge>
        </div>

        {/* Service Name */}
        <h2 className="text-xl font-bold text-gray-900">{service.name}</h2>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="line-clamp-2 text-sm leading-6 text-gray-500">
          {service.description}
        </p>

        {/* Price & Duration */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-gray-500">Service Price</p>
            <p className="text-xl font-bold text-blue-600">৳{service.price}</p>
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
  );
};

export default ServiceDesplayLimit;