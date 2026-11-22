import { IBooking } from "@/type/booking";

import { TableCell, TableRow } from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CalendarDays, Clock, Eye, Scissors } from "lucide-react";
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
  return (
    <TableRow className="hover:bg-slate-50">
      {/* Service Details */}
      <TableCell>
        <div className="flex min-w-[180px] items-center gap-3">
          <div className="flex h-11 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
            <Scissors className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {appointment.serviceName}
            </p>

            {/* <p className="text-xs text-slate-500">
              {appointment.duration} minutes
            </p> */}
          </div>
        </div>
      </TableCell>

      {/* Appointment Date & Time */}
      <TableCell>
        <div className="flex min-w-[145px] items-start gap-2">
          <CalendarDays className="mt-0.5 h-4 w-4 text-slate-500" />

          <div>
            <p className="text-sm text-slate-700">
              {formatDate(appointment.date)}
            </p>

            <p className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              {formatTime(appointment.time)}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Price */}
      <TableCell>
        <span className="text-sm font-semibold text-slate-800">
          ৳{appointment.price}
        </span>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          className={`rounded-full border-0 px-3 py-1 capitalize ${
            appointment.status === "pending"
              ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
              : appointment.status === "confirmed"
                ? "bg-green-100 text-green-600 hover:bg-green-100"
                : "bg-red-100 text-red-600 hover:bg-red-100"
          }`}
        >
          {appointment.status}
        </Badge>
      </TableCell>

      {/* Payment Status */}
      <TableCell>
        <Badge
          className={`rounded-full border-0 px-3 py-1 capitalize ${
            appointment.paymentStatus === "paid"
              ? "bg-green-100 text-green-600 hover:bg-green-100"
              : "bg-pink-100 text-pink-600 hover:bg-pink-100"
          }`}
        >
          {appointment.paymentStatus}
        </Badge>
      </TableCell>

      {/* Request Date */}
      <TableCell>
        <div className="flex min-w-[130px] items-center gap-2">
          <CalendarDays className="h-4 w-4 text-slate-500" />

          <p className="text-sm text-slate-700">
            {formatCreatedAt(appointment.createdAt)}
          </p>
        </div>
      </TableCell>

      {/* Action */}
      <TableCell>
        <AppointmentDetails appointment={appointment} />
        <Link href={"/payment"}>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <Eye className="mr-1 h-4 w-4" />
            payment
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default AppointmentList;
