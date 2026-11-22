"use client";
import AppointmentList from "@/components/dashboard/AppointmentList";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import { IBooking } from "@/type/booking";
import React, { useEffect, useState } from "react";

const AppointmentPage = () => {
  const [booking, setBooking] = useState<IBooking[]>([]);

  const {data:session} = authClient.useSession();
  const email= session?.user.email

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch(
        `http://localhost:8000/bookings-list/${email}`,
      );
      const data = await res.json();
      setBooking(data.bookings || []);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Appointment List</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f3f3fc] hover:bg-[#f3f3fc]">
              <TableHead>Service Details</TableHead>
              <TableHead>Appointment Date & Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {booking.length > 0 ? (
              booking.map((appointment) => (
                <AppointmentList
                  key={appointment._id}
                  appointment={appointment}
                />
              ))
            ) : (
              <TableRow>
                <td colSpan={7} className="h-24 text-center text-slate-500">
                  No appointments found.
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentPage;
