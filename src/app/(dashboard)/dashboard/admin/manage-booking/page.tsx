import { Suspense } from "react";

import BookingManagement from "@/components/dashboard/admin/BookingManagement";
import type { IBooking } from "@/type/booking";


function BookingLoading() {
  return (
    <div className="flex min-h-60 items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading bookings...</p>
    </div>
  );
}

function BookingError() {
  return (
    <div className="rounded-lg border p-6 text-center">
      <h2 className="font-semibold text-destructive">
        Failed to load bookings
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Please check your backend server and try again.
      </p>
    </div>
  );
}

export default function ManageBookingPage() {
  return (
    <Suspense fallback={<BookingLoading />}>
      <ManageBooking />
    </Suspense>
  );
}

async function ManageBooking() {
  let bookings: IBooking[] = [];
  let hasError = false;

  try {
    const response = await fetch(`${process.env.BASE_URL}/bookings`);

    const data = await response.json();

    bookings = Array.isArray(data?.bookings)
      ? data.bookings
      : Array.isArray(data)
        ? data
        : [];
  } catch (error) {
    console.error("Manage bookings error:", error);
    hasError = true;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Manage Bookings
        </h1>

        <p className="text-sm text-muted-foreground">
          Review appointment requests and track their payment status.
        </p>
      </header>

      {hasError ? <BookingError /> : <BookingManagement bookings={bookings} />}
    </div>
  );
}
