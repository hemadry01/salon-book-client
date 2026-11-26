import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CircleX,
  Clock,
  CreditCard,
  Info,
  RotateCcw,
  Scissors,
  ShieldCheck,
  Sparkles,
  Wallet,
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
  title: "Payment canceled · SalonBook",
};

// Demo data — replace with the actual booking when the backend is connected.
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

const formatMoney = (amount: number) => `৳${amount.toLocaleString("en-US")}`;

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

const CanceledPage = () => {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-muted/30 py-10 sm:py-14">
      {/* Soft background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 size-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
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

        {/* Canceled hero */}
        <section className="animate-in fade-in-0 slide-in-from-bottom-2 text-center duration-500">
          <div className="relative mx-auto grid size-20 place-items-center rounded-full bg-rose-600/10 text-rose-600 ring-8 ring-rose-600/5">
            <CircleX className="size-10" strokeWidth={2.5} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Badge className="gap-1.5 bg-rose-600/10 text-rose-700 ring-1 ring-rose-600/20">
              <Wallet />
              No charge made
            </Badge>
            <Badge variant="outline" className="bg-background font-mono">
              {booking.id}
            </Badge>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Payment canceled
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            No worries, {firstName}. Your appointment hasn&apos;t been
            confirmed yet — you can try the payment again whenever you&apos;re
            ready.
          </p>
        </section>

        {/* Booking summary */}
        <Card className="mt-8 animate-in fade-in-0 slide-in-from-bottom-2 gap-0 p-0 shadow-sm duration-500 [animation-delay:120ms] [animation-fill-mode:both]">
          <CardHeader className="border-b p-6">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarDays className="size-4.5 text-muted-foreground" />
              Your booking is still saved
            </CardTitle>
            <CardDescription>
              Complete the payment to confirm this appointment.
            </CardDescription>
            <CardAction>
              <Badge
                variant="secondary"
                className="bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20"
              >
                Payment pending
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
                value="Credit or debit card"
              />
              <Detail
                icon={<Wallet className="size-4" />}
                label="Amount due"
                value={formatMoney(booking.price)}
              />
            </div>

            <Separator />

            <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <Info className="mt-0.5 size-4 shrink-0 text-amber-600" />
              <p className="text-xs leading-5 text-muted-foreground">
                Your card was not charged. If you notice a temporary
                authorization on your statement, your bank will release it
                automatically within a few business days.
              </p>
            </div>
          </CardContent>

          <CardFooter className="justify-center gap-2 border-t bg-muted/40 px-6 py-4 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            Payment details are handled securely by Stripe.
          </CardFooter>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            size="lg"
            className="h-11"
            render={<Link href="/dashboard/user/my-appointments" />}
          >
            <ArrowLeft className="size-4" />
            Back to my appointments
          </Button>
          <Button
            size="lg"
            className="h-11"
            render={<Link href={`/payment?bookingId=${booking.id}`} />}
          >
            <RotateCcw className="size-4" />
            Try payment again
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Changed your mind?{" "}
          <Link
            href="/services"
            className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
          >
            <Sparkles className="size-3.5" />
            Browse other services
          </Link>
        </p>

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

export default CanceledPage;
