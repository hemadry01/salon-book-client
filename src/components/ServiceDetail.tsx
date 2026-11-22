"use client";

import { IService } from '@/type/service';
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Clock,
  CalendarDays,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Tag,
} from "lucide-react";

interface IserviceProps {
  serviceDetail:IService
}

const ServiceDetail = ({ serviceDetail }:IserviceProps) => {
    console.log("serviceDetail");
  return (
    <section className="min-h-screen bg-slate-50 py-10 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Back Button */}
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Services
        </Link>

        <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Service Image */}
            <div className="relative min-h-[300px] bg-gray-100 lg:min-h-[600px]">
              <Image
                src={serviceDetail.image}
                alt={serviceDetail.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <Badge className="absolute left-6 top-6 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-600">
                {serviceDetail.category}
              </Badge>
            </div>

            {/* Service Information */}
            <CardContent className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-blue-600">
                  Premium Service
                </p>

                <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                  {serviceDetail.name}
                </h1>
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-blue-600">
                    <Tag size={18} />
                    <span className="text-sm font-medium">Service Price</span>
                  </div>

                  <h2 className="text-2xl font-bold text-blue-700">
                    ৳{serviceDetail.price}
                  </h2>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-orange-600">
                    <Clock size={18} />
                    <span className="text-sm font-medium">Duration</span>
                  </div>

                  <h2 className="text-xl font-bold text-orange-700">
                    {serviceDetail.duration}
                  </h2>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Description */}
              <div className="mb-8">
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  About This Service
                </h3>

                <p className="text-base leading-8 text-gray-500">
                  {serviceDetail.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="text-green-500" size={19} />
                  Professional Service
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="text-green-500" size={19} />
                  Experienced Professionals
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="text-green-500" size={19} />
                  Easy Appointment Booking
                </div>
              </div>

              {/* Appointment Booking */}
              <Button
                
                className="group h-14 w-full rounded-xl bg-blue-600 text-base font-semibold shadow-lg shadow-blue-100 transition-all hover:bg-blue-700"
              >
                <Link href={`/booking/${serviceDetail._id}`}>
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Book Appointment
                  <ArrowRight className="ml-auto h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Book your appointment today and enjoy our service.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ServiceDetail;