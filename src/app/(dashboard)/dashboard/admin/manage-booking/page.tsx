import { connection } from "next/server";

import BookingManagement from "@/components/dashboard/admin/BookingManagement";
import type { IBooking } from "@/type/booking";

const ManageBooking = async () => {
  // Render at request time so bookings are always up to date.
  // await connection();

  let bookings: IBooking[] = [];

  try {
    const res = await fetch("http://localhost:8000/bookings", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch bookings: ${res.status}`);
    }

    const data = await res.json();

    bookings = Array.isArray(data?.bookings)
      ? data.bookings
      : Array.isArray(data)
        ? data
        : [];
  } catch (error) {
    console.error("Manage bookings error:", error);
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

      <BookingManagement bookings={bookings} />
    </div>
  );
};

export default ManageBooking;
