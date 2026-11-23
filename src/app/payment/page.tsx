"use server";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Scissors,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface PaymentPageProps {
  searchParams: Promise<{
    bookingId?: string;
    canceled?: string;
  }>;
}

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready.",
    );
  }

  // Demo data - replace with actual booking data later
  const booking = {
    id: "BK-2026-001",
    serviceName: "Premium Hair Styling",
    category: "Hair Care",
    price: 25,
    duration: 60,
    date: "2026-11-25",
    time: "10:00 AM",
    customerName: "John Doe",
    customerEmail: "john@example.com",
  };


  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/services"
            className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">
            Complete Payment
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Review your booking and complete your payment securely.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: Booking Information */}
          <div className="space-y-6 lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Booking Summary</CardTitle>
                    <CardDescription className="mt-1">
                      Booking ID: {booking.id}
                    </CardDescription>
                  </div>

                  <Badge variant="secondary">Payment Pending</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Scissors className="h-8 w-8 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Badge variant="outline">{booking.category}</Badge>

                    <h3 className="mt-2 font-semibold">
                      {booking.serviceName}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {booking.duration} minutes
                    </p>
                  </div>

                  <p className="font-bold">
                    ৳{booking.price.toLocaleString("en-BD")}
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Appointment Date
                      </p>
                      <p className="text-sm font-medium">{booking.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Appointment Time
                      </p>
                      <p className="text-sm font-medium">{booking.time}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Your booking contact details</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="text-sm font-medium">{session?.user.name}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="text-sm font-medium">{session?.user.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Secure online payment</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 rounded-lg border-2 border-primary bg-primary/5 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-background">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold">Credit / Debit Card</p>
                    <p className="text-xs text-muted-foreground">
                      Secure payment powered by Stripe
                    </p>
                  </div>

                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Payment */}
          <div className="lg:col-span-2">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Your order total</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Price</span>
                    <span className="font-medium">
                      ৳{booking.price.toLocaleString("en-BD")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">
                      {booking.duration} minutes
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold">
                      ৳{booking.price.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>

                {/* <Button className="mt-7 h-12 w-full gap-2" size="lg">
                  <LockKeyhole size={17} />
                  Pay Now
                  <ArrowRight size={17} />
                </Button> */}

                <form action="/api/checkout_sessions" method="POST">
                  <section>
                    <button
                      className="mt-7 h-12 w-full flex items-center justify-between px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                      type="submit"
                      role="link"
                    >
                      <LockKeyhole size={17} />
                      <span>Pay Now</span>
                      <ArrowRight size={17} />
                    </button>
                  </section>
                </form>

                <div className="mt-5 flex items-start gap-3 rounded-lg bg-muted p-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                  <p className="text-xs leading-5 text-muted-foreground">
                    Your payment is protected with secure payment processing.
                    Your card details will be handled by Stripe.
                  </p>
                </div>

                {/* Stripe Branding */}
                <div className="mt-6 border-t pt-5 text-center">
                  <p className="text-xs text-muted-foreground">
                    Secure payment powered by
                  </p>

                  <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#635BFF]">
                    stripe
                  </p>

                  <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <LockKeyhole size={12} />
                    Secure & Encrypted Checkout
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
