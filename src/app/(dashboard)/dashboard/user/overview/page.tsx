
"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function OverviewPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [totalBooking, setTotalBooking] = useState(0);
  const [pendingBooking, setPendingBooking] = useState(0);
  const [confirmBooking, setConfirmBooking] = useState(0);
  const [rejectedBooking, setRejectedBooking] = useState(0);

  useEffect(() => {
    if (!email) return;

    const fetchTotalBookings = async () => {
      const res = await fetch(`http://localhost:8000/total-bookings/${email}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setTotalBooking(data.totalBookings ?? data.totalBooking ?? 0);
      setPendingBooking(data.pendingBooking ?? 0);
      setConfirmBooking(data.confirmBooking ?? 0);
      setRejectedBooking(data.rejectedBooking ?? 0);
    };

    void fetchTotalBookings();
  }, [email]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard Overview
        </h1>

        <p className="text-sm text-muted-foreground">
          A quick snapshot of your salon&apos;s performance.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Appointment Request</p>
          <h2 className="mt-2 text-3xl font-bold">{totalBooking}</h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pending Appointment</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {pendingBooking}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Confirm Appointment</p>
          <h2 className="mt-2 text-3xl font-bold text-red-500">
            {confirmBooking}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Cenceled Appionment</p>
          <h2 className="mt-2 text-3xl font-bold text-purple-600">
            {rejectedBooking}
          </h2>
        </div>
      </div>
    </div>
  );
}

