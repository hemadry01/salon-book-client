"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Lock,
  Scissors,
  ShieldCheck,
  Sparkles,
  Tag,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

export interface PaymentBooking {
  bookingId?: string;
  customerName?: string;
  customerEmail?: string;
  serviceName?: string;
  category?: string;
  price?: number;
  duration?: number;
  date?: string;
  time?: string;
}

interface PaymentCheckoutProps {
  booking: PaymentBooking;
}

type FieldErrors = {
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
};

const formatMoney = (amount?: number) =>
  amount && amount > 0 ? `৳${amount.toLocaleString("en-US")}` : "—";

const formatDate = (value?: string) => {
  if (!value) return "—";

  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (value?: string) => {
  if (!value) return "—";

  const [hours, minutes] = value.split(":").map(Number);

  if (Number.isNaN(hours)) return value;

  const date = new Date();
  date.setHours(hours, Number.isNaN(minutes) ? 0 : minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const formatCardNumber = (value: string) =>
  onlyDigits(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (value: string) => {
  const digits = onlyDigits(value).slice(0, 4);

  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
};

const getCardBrand = (value: string) => {
  const digits = onlyDigits(value);

  if (/^4/.test(digits)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^6(?:011|5)/.test(digits)) return "Discover";

  return null;
};

const PaymentCheckout = ({ booking }: PaymentCheckoutProps) => {
  const [formData, setFormData] = useState({
    cardName: booking.customerName ?? "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardBrand = getCardBrand(formData.cardNumber);
  const total = formatMoney(booking.price);
  const payLabel =
    booking.price && booking.price > 0 ? `Pay ${total}` : "Pay now";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let nextValue = value;

    if (name === "cardNumber") nextValue = formatCardNumber(value);
    if (name === "expiry") nextValue = formatExpiry(value);
    if (name === "cvc") nextValue = onlyDigits(value).slice(0, 4);

    setFormData((previous) => ({ ...previous, [name]: nextValue }));
    setFieldErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const validate = () => {
    const errors: FieldErrors = {};

    if (formData.cardName.trim().length < 2) {
      errors.cardName = "Please enter the name printed on your card.";
    }

    const cardDigits = onlyDigits(formData.cardNumber);

    if (cardDigits.length < 15 || cardDigits.length > 16) {
      errors.cardNumber = "Please enter a valid card number.";
    }

    const [monthPart, yearPart] = formData.expiry.split("/");
    const month = Number(monthPart);
    const year = Number(yearPart);

    if (
      monthPart?.length !== 2 ||
      yearPart?.length !== 2 ||
      month < 1 ||
      month > 12
    ) {
      errors.expiry = "Use the MM/YY format.";
    } else {
      const expiryDate = new Date(2000 + year, month, 1);

      if (expiryDate <= new Date()) {
        errors.expiry = "This card has expired.";
      }
    }

    if (onlyDigits(formData.cvc).length < 3) {
      errors.cvc = "Enter the 3 or 4 digit security code.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // TODO(stripe): Replace this placeholder with a request to your backend,
      // then redirect the browser to the Stripe Checkout URL it returns.
      //
      // const res = await fetch("http://localhost:8000/payment/create-checkout-session", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     bookingId: booking.bookingId,
      //     amount: booking.price,
      //   }),
      // });
      // const { url } = await res.json();
      // window.location.href = url;
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.add({
        type: "info",
        title: "Stripe Checkout is coming soon",
        description:
          "This is a preview of the payment step. No card was charged.",
      });
    } catch {
      toast.add({
        type: "error",
        title: "Unable to start checkout",
        description: "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-dvh bg-muted/30 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* Brand header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Scissors className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              SalonBook
            </span>
          </Link>

          <Badge variant="outline" className="gap-1.5 bg-background px-3 py-1">
            <ShieldCheck className="text-emerald-600" />
            Secure checkout
          </Badge>
        </header>

        {/* Page intro */}
        <div className="mb-8 space-y-4">
          <Link
            href="/dashboard/user/my-appointments"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to my appointments
          </Link>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Complete your payment
            </h1>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Review your booking and pay securely to confirm your appointment.
            </p>
          </div>

          <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <span className="grid size-5 place-items-center rounded-full bg-emerald-600 text-white">
                <Check className="size-3" />
              </span>
              Booking
            </li>
            <li className="h-px w-6 bg-border" aria-hidden="true" />
            <li className="flex items-center gap-1.5 font-medium text-foreground">
              <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                2
              </span>
              Payment
            </li>
            <li className="h-px w-6 bg-border" aria-hidden="true" />
            <li className="flex items-center gap-1.5">
              <span className="grid size-5 place-items-center rounded-full border border-border bg-background">
                3
              </span>
              Confirmation
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Payment form */}
          <Card className="gap-0 p-0 shadow-sm">
            <CardHeader className="border-b p-6">
              <CardTitle className="text-lg">Payment information</CardTitle>
              <CardDescription>
                Enter your card details to complete the booking.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} noValidate>
                <FieldGroup className="gap-5">
                  {/* Payment method */}
                  <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-3.5 ring-1 ring-primary/10">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-background text-primary shadow-sm">
                      <CreditCard className="size-5" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Credit or debit card</p>
                      <p className="text-xs text-muted-foreground">
                        Secure payment powered by Stripe
                      </p>
                    </div>
                    <span className="grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                  </div>

                  <FieldSeparator>Card details</FieldSeparator>

                  <Field data-invalid={Boolean(fieldErrors.cardName)}>
                    <FieldLabel htmlFor="cardName">Name on card</FieldLabel>
                    <InputGroup className="h-11">
                      <InputGroupAddon>
                        <User />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="cardName"
                        name="cardName"
                        type="text"
                        autoComplete="cc-name"
                        placeholder="Jane Doe"
                        value={formData.cardName}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.cardName)}
                        className="h-full"
                      />
                    </InputGroup>
                    <FieldError>{fieldErrors.cardName}</FieldError>
                  </Field>

                  <Field data-invalid={Boolean(fieldErrors.cardNumber)}>
                    <FieldLabel htmlFor="cardNumber">Card number</FieldLabel>
                    <InputGroup className="h-11">
                      <InputGroupAddon>
                        <CreditCard />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.cardNumber)}
                        className="h-full"
                      />
                      <InputGroupAddon align="inline-end">
                        <span className="text-xs font-medium text-muted-foreground">
                          {cardBrand ?? "Card"}
                        </span>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldError>{fieldErrors.cardNumber}</FieldError>
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={Boolean(fieldErrors.expiry)}>
                      <FieldLabel htmlFor="expiry">Expiry date</FieldLabel>
                      <Input
                        id="expiry"
                        name="expiry"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.expiry)}
                        className="h-11"
                      />
                      <FieldError>{fieldErrors.expiry}</FieldError>
                    </Field>

                    <Field data-invalid={Boolean(fieldErrors.cvc)}>
                      <FieldLabel htmlFor="cvc">CVC</FieldLabel>
                      <Input
                        id="cvc"
                        name="cvc"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        value={formData.cvc}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.cvc)}
                        className="h-11"
                      />
                      <FieldError>{fieldErrors.cvc}</FieldError>
                    </Field>
                  </div>

                  {/* Placeholder notice */}
                  <div className="flex items-start gap-3 rounded-xl border border-dashed bg-muted/40 p-4">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-amber-500" />
                    <p className="text-xs leading-5 text-muted-foreground">
                      Stripe Checkout isn&apos;t connected yet. This form is a
                      preview — no card details are stored and nothing is
                      charged.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="size-4" />
                        Redirecting to Stripe...
                      </>
                    ) : (
                      <>
                        <Lock className="size-4" />
                        {payLabel}
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>

                  <p className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                    <Lock className="mt-0.5 size-3.5 shrink-0" />
                    You&apos;ll be redirected to Stripe&apos;s secure checkout
                    page to finish this payment.
                  </p>
                </FieldGroup>
              </form>
            </CardContent>

            <CardFooter className="justify-center gap-2 border-t bg-muted/40 px-6 py-4 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" />
              Your payment details are encrypted and never stored on our
              servers.
            </CardFooter>
          </Card>

          {/* Booking summary */}
          <Card className="gap-0 p-0 shadow-sm lg:sticky lg:top-8">
            <CardHeader className="border-b p-6">
              <CardTitle className="text-lg">Booking summary</CardTitle>
              <CardDescription>
                Double-check everything before you pay.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 p-6">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Scissors className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {booking.serviceName || "Salon service"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {booking.category || "Appointment"}
                  </p>
                </div>
                <Badge variant="secondary">Unpaid</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-4 text-sm">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    Date
                  </span>
                  <p className="font-medium">{formatDate(booking.date)}</p>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    Time
                  </span>
                  <p className="font-medium">{formatTime(booking.time)}</p>
                </div>
              </div>

              {booking.customerName || booking.customerEmail ? (
                <div className="rounded-xl border bg-background/60 p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <User className="size-3.5" />
                    Billed to
                  </p>
                  {booking.customerName ? (
                    <p className="text-sm font-medium">{booking.customerName}</p>
                  ) : null}
                  {booking.customerEmail ? (
                    <p className="truncate text-xs text-muted-foreground">
                      {booking.customerEmail}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="size-4" />
                    Service price
                  </span>
                  <span className="font-medium">{total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Processing fee</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-baseline justify-between">
                <span className="font-medium">Total due</span>
                <span className="text-2xl font-semibold tracking-tight">
                  {total}
                </span>
              </div>

              <ul className="space-y-2 border-t pt-4 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
                  256-bit SSL encrypted payment
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="size-4 shrink-0 text-emerald-600" />
                  Card details are never stored
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="size-4 shrink-0 text-emerald-600" />
                  Instant confirmation after payment
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default PaymentCheckout;
