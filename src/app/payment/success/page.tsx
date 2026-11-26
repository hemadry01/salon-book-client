import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Mail,
  ReceiptText,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Payment successful · SalonBook",
};

// Demo data — replace with the booking/session returned by Stripe later.
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
  paymentMethod: "Visa ending in 4242",
  transactionId: "ch_3Pq8Lk2eZvKYlo2C",
};

const formatMoney = (amount: number) =>
  `৳${amount.toLocaleString("en-US")}`;

const formatDate = (value: string) => {
  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const firstName = booking.customerName.split(" ")[0];

const steps = [
  {
    icon: Mail,
    title: "Confirmation email",
    description: `A receipt and appointment details are on their way to ${booking.customerEmail}.`,
  },
  {
    icon: Clock,
    title: "Arrive 10 minutes early",
    description:
      "Give yourself a little time to check in and settle in before your service.",
  },
  {
    icon: CalendarDays,
    title: "Need to reschedule?",
    description:
      "Manage or cancel your appointment anytime from your dashboard.",
  },
];

const Detail = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
      {icon}
    </span>
    <div className="min-w-0 space-y-0.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-medium">{value}</p>
    </div>
  </div>
);

const SuccessPage = () => {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-muted/30 py-10 sm:py-14">
      {/* Soft background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 size-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        {/* Brand header */}
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Scissors className="size-4.5" />
            </span>
            <span className="font-semibold tracking-tight">SalonBook</span>
          </Link>

          <Badge variant="outline" className="gap-1.5 bg-background px-3 py-1">
            <ShieldCheck className="text-emerald-600" />
            Secure checkout
          </Badge>
        </header>

        {/* Success hero */}
        <section className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 text-center">
          <div className="relative mx-auto grid size-20 place-items-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/25 ring-8 ring-emerald-600/10">
            <Check className="size-10" strokeWidth={3} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Badge className="gap-1.5 bg-emerald-600/10 text-emerald-700 ring-1 ring-emerald-600/20">
              <BadgeCheck />
              Payment confirmed
            </Badge>
            <Badge variant="outline" className="bg-background font-mono">
              {booking.id}
            </Badge>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Payment successful
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Thanks, {firstName}. Your appointment is booked and paid for —
            we&apos;ve sent the details to{" "}
            <span className="font-medium text-foreground">
              {booking.customerEmail}
            </span>
            .
          </p>
        </section>

        {/* Receipt */}
        <Card className="mt-8 animate-in fade-in-0 slide-in-from-bottom-2 gap-0 p-0 shadow-sm duration-500 [animation-delay:120ms] [animation-fill-mode:both]">
          <CardHeader className="border-b p-6">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ReceiptText className="size-4.5 text-muted-foreground" />
              Payment receipt
            </CardTitle>
            <CardDescription>
              Keep this summary for your records.
            </CardDescription>
            <CardAction>
              <Badge className="bg-emerald-600/10 text-emerald-700 ring-1 ring-emerald-600/20">
                Paid
              </Badge>
            </CardAction>
          </CardHeader>

          <CardContent className="space-y-5 p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Scissors className="size-5" />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="truncate font-medium">{booking.serviceName}</p>
                <p className="text-xs text-muted-foreground">
                  {booking.category} · {booking.duration} minutes
                </p>
              </div>
              <p className="font-semibold">{formatMoney(booking.price)}</p>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <Detail
                icon={<CalendarDays className="size-4" />}
                label="Appointment date"
                value={formatDate(booking.date)}
              />
              <Detail
                icon={<Clock className="size-4" />}
                label="Appointment time"
                value={booking.time}
              />
              <Detail
                icon={<CreditCard className="size-4" />}
                label="Payment method"
                value={booking.paymentMethod}
              />
              <Detail
                icon={<Mail className="size-4" />}
                label="Billed to"
                value={booking.customerEmail}
              />
            </div>

            <Separator />

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Service price</span>
                <span className="font-medium">
                  {formatMoney(booking.price)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Processing fee</span>
                <span className="font-medium text-emerald-600">Free</span>
              </div>
              <Separator className="my-1" />
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-medium">Total paid</span>
                <span className="text-xl font-semibold tracking-tight">
                  {formatMoney(booking.price)}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-between gap-3 border-t bg-muted/40 px-6 py-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              Securely processed by Stripe
            </span>
            <span className="truncate font-mono">Txn {booking.transactionId}</span>
          </CardFooter>
        </Card>

        {/* What happens next */}
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex gap-3 rounded-xl border bg-card p-4 shadow-xs"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-600/10 text-emerald-700">
                <step.icon className="size-4.5" />
              </span>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs leading-5 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            size="lg"
            className="h-11"
            render={<Link href="/services" />}
          >
            <Sparkles className="size-4" />
            Book another service
          </Button>
          <Button
            size="lg"
            className="h-11"
            render={<Link href="/dashboard/user/my-appointments" />}
          >
            View my appointments
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-10 flex flex-col items-center gap-1.5 text-center text-xs text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            Your payment details are encrypted and never stored on our servers.
          </p>
          <p>
            Need help?{" "}
            <Link
              href="/"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Contact support
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default SuccessPage;
