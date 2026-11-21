import { IService } from '@/type/service';
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Clock, ArrowRight } from "lucide-react";

interface IServiceProps {
  service:IService
}

const BrowsService = ({ service }:IServiceProps) => {
    console.log("My-service",service)
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
        <Button className="group h-12 w-full rounded-xl bg-rose-500 px-6 py-2.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
          <Link
            href={`/services/${service._id}`}
            className="flex items-center justify-center gap-2"
          >
            View Details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BrowsService;