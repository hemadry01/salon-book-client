import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import type { IBooking } from "@/type/booking";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  LockKeyhole,
  Scissors,
  ShieldCheck,
} from "lucide-react";

import { headers } from "next/headers";
import Link from "next/link";
import PayNowButton from "../_components/PayNow";

interface IBookingPageProps {
  params: Promise<{ id: string }>;
}

const API_URL = process.env.BACKEND_URL || "http://localhost:8000";

// Loading UI
function PaymentLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40">
      <p className="text-sm text-muted-foreground">
        Loading payment details...
      </p>
    </main>
  );
}

// Main Page
export default function PayServicePage({ params }: IBookingPageProps) {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PayServiceContent params={params} />
    </Suspense>
  );
}

// Async Payment Content
async function PayServiceContent({ params }: IBookingPageProps) {
  const { id } = await params;

  // Get logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  // Fetch booking
  let booking: IBooking | null = null;
  let errorMessage = "";

  try {
    const res = await fetch(`${API_URL}/bookings/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch booking: ${res.status}`);
    }

    const data = await res.json();

    booking = data?.booking ?? null;
  } catch (error) {
    console.error("Booking fetch error:", error);

    errorMessage = "Unable to load booking information.";
  }

  const formattedPrice = booking?.price?.toLocaleString("en-BD") ?? "0";

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

        {/* Error / Booking Content */}
        {errorMessage || !booking ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="font-medium text-destructive">
                {errorMessage || "Booking not found."}
              </p>

              <Link
                href="/dashboard/user/my-appointments"
                className="mt-4 inline-block text-sm text-primary underline"
              >
                Back to My Appointments
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left: Booking Information */}
            <div className="space-y-6 lg:col-span-3">
              {/* Booking Summary */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle>Booking Summary</CardTitle>

                      <CardDescription className="mt-1">
                        Booking ID: {booking._id}
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
                      <Badge variant="outline">{booking.customerName}</Badge>

                      <h3 className="mt-2 font-semibold">
                        {booking.serviceName}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {booking.duration} minutes
                      </p>
                    </div>

                    <p className="font-bold">৳{formattedPrice}</p>
                  </div>

                  {/* Appointment Details */}
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
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

                  <CardDescription>
                    Your booking contact details
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>

                    <p className="text-sm font-medium">
                      {booking.customerName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Email Address
                    </p>

                    <p className="text-sm font-medium">
                      {booking.customerEmail}
                    </p>
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
                      <p className="text-sm font-semibold">
                        Credit / Debit Card
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Secure payment powered by Stripe
                      </p>
                    </div>

                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Payment Details */}
            <div className="lg:col-span-2">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>

                  <CardDescription>Your order total</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Service Price
                      </span>

                      <span className="font-medium">৳{formattedPrice}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>

                      <span className="font-medium">
                        {booking.duration} minutes
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total Amount</span>

                      <span className="text-2xl font-bold">
                        ৳{formattedPrice}
                      </span>
                    </div>
                  </div>

                  {/* Pay Now Button */}
                  {userId ? (
                    <div className="mt-6">
                      <PayNowButton
                        serviceId={String(booking.serviceId)}
                        userId={userId}
                        bookingId={String(booking._id)}
                      />
                    </div>
                  ) : (
                    <p className="mt-6 text-sm text-destructive">
                      Please log in to complete your payment.
                    </p>
                  )}

                  {/* Security Information */}
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
        )}
      </div>
    </main>
  );
}
