import { Suspense } from "react";
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
  CardDescription,
  CardHeader,
  CardTitle,
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

function PaymentLoading() {
  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex min-h-60 items-center justify-center">
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    </main>
  );
}

// Main Page - Synchronous Server Component
export default function PaymentPage({ searchParams }: PaymentPageProps) {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentContent searchParams={searchParams} />
    </Suspense>
  );
}

// Dynamic Content - Async Server Component
async function PaymentContent({ searchParams }: PaymentPageProps) {
  const { bookingId, canceled } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Demo booking data
  // Replace with actual database booking information.
  const booking = {
    id: bookingId || "BK-2026-001",
    serviceId: "SERVICE_ID",
    serviceName: "Premium Hair Styling",
    category: "Hair Care",
    price: 25,
    duration: 60,
    date: "2026-11-25",
    time: "10:00 AM",
    customerName: session?.user?.name || "Guest User",
    customerEmail: session?.user?.email || "guest@example.com",
  };

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Back Navigation */}
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-3">
            Secure Checkout
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight">
            Complete Your Payment
          </h1>

          <p className="mt-2 text-muted-foreground">
            Review your booking details and proceed with payment.
          </p>
        </div>

        {/* Payment Cancelled Message */}
        {canceled && (
          <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm">
            Your payment was canceled. You can try again whenever you are ready.
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Details */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>
                  Your selected service and appointment details
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Scissors className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{booking.serviceName}</h3>

                    <p className="text-sm text-muted-foreground">
                      {booking.category}
                    </p>
                  </div>

                  <Badge variant="outline">Selected</Badge>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Appointment Date
                      </p>
                      <p className="font-medium">{booking.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{booking.duration} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Appointment Time
                      </p>
                      <p className="font-medium">{booking.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Booking ID
                      </p>
                      <p className="font-medium">{booking.id}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{booking.customerName}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{booking.customerEmail}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Review your total amount</CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Price</span>

                  <span>${booking.price.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>

                  <span>${booking.price.toFixed(2)}</span>
                </div>

                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="bookingId" value={booking.id} />

                  <Button type="submit" className="w-full">
                    <LockKeyhole className="mr-2 h-4 w-4" />
                    Pay Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />

                  <p>
                    Your payment is processed securely. Your payment information
                    is protected.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  Secure Checkout
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
