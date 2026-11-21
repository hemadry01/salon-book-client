import React from 'react';
import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IService } from '@/type/service';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@base-ui/react';

const ServiceDesplay = async() => {

    let serviceData: IService[] = [];
      try {
        const res = await fetch("http://localhost:8000/sevices/limit", {
          cache: "no-store",
        });
    
        const result = await res.json();
        serviceData = result.data;
    
        console.log("our service", serviceData);
      } catch (error) {
        console.log(error);
      }

    return (
      <div className="mt-5">
        <div className=" px-6 lg:px-10">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Salon Category list
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 px-6 lg:px-10">
          {serviceData.map((studioItem) => (
            <Card key={studioItem._id} className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {/* Service Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={studioItem.image}
                  alt={studioItem.name}
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
                    {studioItem.category}
                  </Badge>
                </div>

                {/* Service Name */}
                <h2 className="text-xl font-bold text-gray-900">
                  {studioItem.name}
                </h2>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Description */}
                <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                  {studioItem.description}
                </p>

                {/* Price & Duration */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Service Price</p>
                    <p className="text-xl font-bold text-blue-600">
                      ৳{studioItem.price}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="mb-1 text-xs text-gray-500">Duration</p>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      <Clock size={16} />
                      {studioItem.duration}
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* View Details */}
              <CardFooter>
                <Button className="group h-12 w-full rounded-xl bg-rose-500 px-6 py-2.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
                  <Link
                    href={`/services/${studioItem._id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
};

export default ServiceDesplay;