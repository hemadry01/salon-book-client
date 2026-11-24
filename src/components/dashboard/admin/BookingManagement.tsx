"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Eye,
  Mail,
  Scissors,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { IBooking } from "@/type/booking";
import { toast } from "@/components/ui/toast";

interface BookingManagementProps {
  bookings: IBooking[];
}

interface BookingStatusResponse {
  message: string;
}

const statusStyles: Record<IBooking["status"], string> = {
  pending: "bg-orange-50 text-orange-600 ring-orange-200/70",
  confirmed: "bg-emerald-50 text-emerald-600 ring-emerald-200/70",
  rejected: "bg-red-50 text-red-600 ring-red-200/70",
  cancelled: "bg-slate-100 text-slate-600 ring-slate-200/70",
};

const statusDotStyles: Record<IBooking["status"], string> = {
  pending: "bg-orange-500",
  confirmed: "bg-emerald-500",
  rejected: "bg-red-500",
  cancelled: "bg-slate-400",
};

const paymentStyles: Record<IBooking["paymentStatus"], string> = {
  unpaid: "bg-pink-50 text-pink-600 ring-pink-200/70",
  paid: "bg-emerald-50 text-emerald-600 ring-emerald-200/70",
  refunded: "bg-violet-50 text-violet-600 ring-violet-200/70",
};

const paymentLabels: Record<IBooking["paymentStatus"], string> = {
  unpaid: "Unpaid",
  paid: "Paid",
  refunded: "Refunded",
};

const toDate = (value?: string) => {
  if (!value) return null;

  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value}T00:00:00`
    : value;

  const date = new Date(normalized);

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value?: string) => {
  const date = toDate(value);

  if (!date) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (value?: string) => {
  if (!value) return "N/A";

  if (/am|pm/i.test(value)) return value;

  const [hours, minutes] = value.split(":").map(Number);

  if (Number.isNaN(hours)) return value;

  const date = new Date();
  date.setHours(hours, Number.isNaN(minutes) ? 0 : minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatPrice = (price?: number) =>
  `৳${Number(price || 0).toLocaleString("en-US")}`;

const BookingManagement = ({ bookings }: BookingManagementProps) => {
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const handleConfirmBooking = async (
    id: IBooking["_id"],
    status: IBooking["status"],
  ) => {
    
    const res = await fetch(`http://localhost:8000/bookings/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({status}),
    });
    const data: BookingStatusResponse = await res.json();
     if (!res.ok) {
       //throw new Error(data.message);
       toast.add({
         type: "error",
         description: "Status update failed",
       });
     }

     toast.add({
       type: "status",
       description: "Status update successful",
     });
     return data;
  }

  const handleCancelBooking = async (
    id: IBooking["_id"],
    //status: IBooking["status"],
  ) => {
    const res = await fetch(
      `http://localhost:8000/admin-bookings/${id}/status`,
      {
        method: "PATCH",
      },
    );
    const cancleData: BookingStatusResponse = await res.json();
    if (!res.ok) {
      //throw new Error(data.message);
      toast.add({
        type: "error",
        description: "Status update failed",
      });
    }

    toast.add({
      type: "status",
      description: "Booking cancle",
    });
    return cancleData;
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <Table className="min-w-[1080px] table-fixed">
          <TableHeader className="bg-[#f4f5fb] dark:bg-muted/50">
            <TableRow className="border-b hover:bg-transparent">
              <TableHead className="w-[23%] py-3 pl-5 text-sm font-semibold text-slate-700">
                Details
              </TableHead>
              <TableHead className="w-[20%] py-3 text-sm font-semibold text-slate-700">
                Appointment Date &amp; Time
              </TableHead>
              <TableHead className="w-[8%] py-3 text-sm font-semibold text-slate-700">
                Price
              </TableHead>
              <TableHead className="w-[10%] py-3 text-sm font-semibold text-slate-700">
                Status
              </TableHead>
              <TableHead className="w-[12%] py-3 text-sm font-semibold text-slate-700">
                Request Date
              </TableHead>
              <TableHead className="w-[150px] py-3 pr-5 text-sm font-semibold text-slate-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {safeBookings.length > 0 ? (
              safeBookings.map((booking) => (
                <TableRow
                  key={booking._id}
                  className="border-b transition-colors last:border-0 hover:bg-muted/40"
                >
                  {/* Customer / service details */}
                  <TableCell className="py-3 pl-5 align-top">
                    <div className="space-y-1.5">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {booking.customerName || "Unknown customer"}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Scissors className="size-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">
                          {booking.serviceName || "Service unavailable"}
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Mail className="size-3.5 shrink-0 text-slate-400" />
                        <span
                          className="truncate"
                          title={booking.customerEmail}
                        >
                          {booking.customerEmail || "No email provided"}
                        </span>
                      </p>
                    </div>
                  </TableCell>

                  {/* Appointment date & time */}
                  <TableCell className="py-3 align-top">
                    <div className="space-y-1.5">
                      <p className="flex items-center gap-1.5 text-sm text-slate-700">
                        <CalendarDays className="size-4 shrink-0 text-slate-500" />
                        {formatDate(booking.date)}
                      </p>
                      <p className="flex items-center gap-1.5 text-sm text-slate-700">
                        <Clock className="size-4 shrink-0 text-slate-500" />
                        {formatTime(booking.time)}
                      </p>
                      <div className="flex items-center gap-1.5 border-t border-slate-200 pt-1.5 text-xs text-slate-500">
                        <Clock className="size-3.5 shrink-0" />
                        {booking.duration ? `${booking.duration} min` : "N/A"}
                      </div>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {formatPrice(booking.price)}
                    </p>
                  </TableCell>

                  {/* Booking status */}
                  <TableCell className="py-3">
                    <Badge
                      className={cn(
                        "h-6 gap-1.5 rounded-full px-2.5 text-xs font-medium capitalize ring-1 ring-inset",
                        statusStyles[booking.status] ??
                          "bg-slate-100 text-slate-600 ring-slate-200/70",
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          statusDotStyles[booking.status] ?? "bg-slate-400",
                        )}
                      />
                      {booking.status || "unknown"}
                    </Badge>
                  </TableCell>

                  {/* Request date */}
                  <TableCell className="py-3">
                    <p className="flex items-center gap-1.5 text-sm text-slate-700">
                      <CalendarDays className="size-4 shrink-0 text-slate-500" />
                      {formatDate(booking.createdAt)}
                    </p>
                  </TableCell>

                  {/* Actions */}

                  <TableCell className="py-3 pr-5 align-top">
                    <div className="flex flex-col gap-1.5">
                      {/* View Details */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBooking(booking)}
                        className="w-full justify-center gap-1.5 rounded-lg border-slate-200 bg-background text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50"
                      >
                        <Eye className="size-3.5" />
                        View Details
                      </Button>

                      {/* Confirm Button */}
                      <Button
                        type="button"
                        size="sm"
                        disabled={
                          booking.status === "confirmed" ||
                          booking.status === "cancelled"
                        }
                        onClick={() =>
                          handleConfirmBooking(booking._id, "confirmed")
                        }
                        className="w-full justify-center gap-1.5 rounded-lg bg-emerald-600 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                      >
                        <Check className="size-3.5" />
                        Confirm
                      </Button>

                      {/* Cancel Button */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={
                          booking.status === "cancelled" ||
                          booking.status === "confirmed"
                        }
                        onClick={() =>
                          handleCancelBooking(booking._id)
                        }
                        className="w-full justify-center gap-1.5 rounded-lg border-red-200 bg-white text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <X className="size-3.5" />
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Booking details dialog */}
      <Dialog
        open={selectedBooking !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedBooking(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Full information for this appointment request.
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              <div className="rounded-xl border bg-muted/40 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {selectedBooking.serviceName || "Service unavailable"}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {selectedBooking.duration
                        ? `${selectedBooking.duration} minutes`
                        : "Duration not available"}
                    </p>
                  </div>
                  <p className="shrink-0 text-lg font-bold">
                    {formatPrice(selectedBooking.price)}
                  </p>
                </div>
              </div>

              <dl className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">Customer</dt>
                  <dd className="mt-0.5 text-sm font-medium">
                    {selectedBooking.customerName || "Unknown customer"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Email</dt>
                  <dd className="mt-0.5 truncate text-sm font-medium">
                    {selectedBooking.customerEmail || "No email provided"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Appointment Date
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium">
                    {formatDate(selectedBooking.date)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Appointment Time
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium">
                    {formatTime(selectedBooking.time)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Status</dt>
                  <dd className="mt-1">
                    <Badge
                      className={cn(
                        "h-6 gap-1.5 rounded-full px-2.5 text-xs font-medium capitalize ring-1 ring-inset",
                        statusStyles[selectedBooking.status] ??
                          "bg-slate-100 text-slate-600 ring-slate-200/70",
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          statusDotStyles[selectedBooking.status] ??
                            "bg-slate-400",
                        )}
                      />
                      {selectedBooking.status || "unknown"}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Payment Status
                  </dt>
                  <dd className="mt-1">
                    <Badge
                      className={cn(
                        "h-6 gap-1.5 rounded-full px-2.5 text-xs font-medium ring-1 ring-inset",
                        paymentStyles[selectedBooking.paymentStatus] ??
                          "bg-slate-100 text-slate-600 ring-slate-200/70",
                      )}
                    >
                      <CreditCard className="size-3.5" />
                      {paymentLabels[selectedBooking.paymentStatus] ??
                        selectedBooking.paymentStatus ??
                        "Unknown"}
                    </Badge>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-muted-foreground">
                    Requested On
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium">
                    {formatDate(selectedBooking.createdAt)}
                  </dd>
                </div>
                {selectedBooking.specialRequest && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-muted-foreground">
                      Special Request
                    </dt>
                    <dd className="mt-1 rounded-lg border bg-muted/40 p-3 text-sm leading-5">
                      {selectedBooking.specialRequest}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </Button>
            {/* {selectedBooking && selectedBooking.paymentStatus !== "paid" && (
              <Link
                href={`/payment?bookingId=${selectedBooking._id}`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700",
                )}
              >
                <CreditCard className="size-4" />
                Payment
              </Link>
            )} */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingManagement;
