import { IBooking } from "@/type/booking";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  CalendarDays,
  Clock,
  Eye,
  Scissors,
  CreditCard,
  XCircle,
} from "lucide-react";

import AppointmentDetails from "./PayService";
import Link from "next/link";

interface IBookingProps {
  appointment: IBooking;
}

const formatDate = (date: string) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCreatedAt = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const AppointmentList = ({ appointment }: IBookingProps) => {
  const paymentHref = `/payment?${new URLSearchParams({
    bookingId: appointment._id,
    service: appointment.serviceName,
    price: String(appointment.price),
    duration: String(appointment.duration),
    date: appointment.date,
    time: appointment.time,
    email: appointment.customerEmail,
    customer: appointment.customerName,
  })}`;

  return (
    <TableRow className="group border-b border-slate-100 transition-colors hover:bg-indigo-50/40">
      {/* Service */}
      <TableCell>
        <div className="flex min-w-[180px] items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 transition-colors group-hover:bg-indigo-200">
            <Scissors className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {appointment.serviceName}
            </p>
            <p className="text-xs text-slate-400">
              {appointment.duration} minutes
            </p>
          </div>
        </div>
      </TableCell>

      {/* Date & Time */}
      <TableCell>
        <div className="min-w-[145px] space-y-1">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium text-slate-700">
              {formatDate(appointment.date)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs text-slate-500">
              {formatTime(appointment.time)}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Price */}
      <TableCell>
        <span className="text-sm font-bold text-slate-800">
          ৳{appointment.price}
        </span>
      </TableCell>

      {/* Appointment Status */}
      <TableCell>
        <Badge
          className={`rounded-full border px-3 py-1 text-xs font-medium capitalize shadow-none ${
            appointment.status === "pending"
              ? "border-orange-200 bg-orange-50 text-orange-600"
              : appointment.status === "confirmed"
                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {appointment.status}
        </Badge>
      </TableCell>

      {/* Payment Status */}
      <TableCell>
        <Badge
          className={`rounded-full border px-3 py-1 text-xs font-medium capitalize shadow-none ${
            appointment.paymentStatus === "paid"
              ? "border-emerald-200 bg-emerald-50 text-emerald-600"
              : "border-pink-200 bg-pink-50 text-pink-600"
          }`}
        >
          {appointment.paymentStatus}
        </Badge>
      </TableCell>

      {/* Request Date */}
      <TableCell>
        <div className="flex min-w-[130px] items-center gap-2">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600">
            {formatCreatedAt(appointment.createdAt)}
          </span>
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <div className="flex min-w-[190px] items-center gap-2">
          <AppointmentDetails appointment={appointment} />

          {appointment.status === "confirmed" &&
            appointment.paymentStatus !== "paid" && (
              <Link href={paymentHref}>
                <Button
                  size="sm"
                  className="h-8 gap-1.5 rounded-lg bg-indigo-600 px-3 text-xs text-white shadow-sm hover:bg-indigo-700"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Payment
                </Button>
              </Link>
            )}

          {appointment.status === "pending" && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 rounded-lg border-red-200 px-3 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <XCircle className="h-3.5 w-3.5" />
              Cancel
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AppointmentList;
