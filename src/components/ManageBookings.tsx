"use client";

import { useState } from "react";
import { Eye, Check, X, CalendarDays, Clock } from "lucide-react";

interface Booking {
  _id: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  date: string;
  time: string;
  price: number;
  status: "pending" | "confirmed" | "rejected" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  createdAt?: string | Date;
}

interface ManageBookingsProps {
  bookings?: Booking[] | null;
  onStatusChange: (
    id: string,
    status: "confirmed" | "rejected",
  ) => Promise<void>;
  onViewDetails: (booking: Booking) => void;
}

const formatDate = (value?: string | Date) => {
  if (!value) return "N/A";

  const date = new Date(value);

  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const statusStyles: Record<Booking["status"], string> = {
  pending: "bg-orange-100 text-orange-600",
  confirmed: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-600",
  cancelled: "bg-gray-100 text-gray-600",
};

const paymentStyles: Record<Booking["paymentStatus"], string> = {
  unpaid: "bg-pink-100 text-pink-600",
  paid: "bg-green-100 text-green-600",
  refunded: "bg-purple-100 text-purple-600",
};

export default function ManageBookings({
  bookings,
  onStatusChange,
  onViewDetails,
}: ManageBookingsProps) {
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    status: "confirmed" | "rejected",
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${status} this booking?`,
    );

    if (!confirmed) return;

    try {
      setLoadingId(id);

      await onStatusChange(id, status);
    } catch (error) {
      console.error("Booking status update failed:", error);

      window.alert("Failed to update booking status. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
      <div className="min-w-[1250px]">
        {/* Table Header */}
        <div className="flex items-center border-b bg-[#f1f2fa] px-4 py-3 text-sm font-semibold text-gray-800">
          <div className="w-[18%]">Service Details</div>
          <div className="w-[19%]">Appointment Date & Time</div>
          <div className="w-[8%]">Price</div>
          <div className="w-[9%]">Status</div>
          <div className="w-[12%]">Payment Status</div>
          <div className="w-[15%]">Request Date</div>
          <div className="w-[19%]">Action</div>
        </div>

        {/* Booking Rows */}
        {safeBookings.length > 0 ? (
          safeBookings.map((booking) => {
            const isLoading = loadingId === booking._id;

            return (
              <div
                key={booking._id}
                className="flex min-h-[68px] items-center border-b px-4 py-3 text-sm transition hover:bg-gray-50"
              >
                {/* Service Details */}
                <div className="flex w-[18%] items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Clock size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {booking.serviceName || "Service unavailable"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {booking.customerName || "Unknown customer"}
                    </p>
                  </div>
                </div>

                {/* Appointment Date & Time */}
                <div className="w-[19%]">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CalendarDays size={16} className="text-gray-500" />
                    {formatDate(booking.date)}
                  </div>

                  <div className="ml-6 mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={13} />
                    {booking.time || "N/A"}
                  </div>
                </div>

                {/* Price */}
                <div className="w-[8%] font-medium text-gray-800">
                  ৳{Number(booking.price || 0).toLocaleString("en-BD")}
                </div>

                {/* Booking Status */}
                <div className="w-[9%]">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      statusStyles[booking.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {booking.status || "unknown"}
                  </span>
                </div>

                {/* Payment Status */}
                <div className="w-[12%]">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      paymentStyles[booking.paymentStatus] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {booking.paymentStatus || "unknown"}
                  </span>
                </div>

                {/* Request Date */}
                <div className="flex w-[15%] items-center gap-2 text-gray-700">
                  <CalendarDays size={16} className="text-gray-500" />
                  {formatDate(booking.createdAt)}
                </div>

                {/* Actions */}
                <div className="flex w-[19%] items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onViewDetails(booking)}
                    className="flex items-center gap-1 rounded-lg border px-3 py-2 font-medium transition hover:bg-gray-100"
                  >
                    <Eye size={15} />
                    Details
                  </button>

                  {booking.status === "pending" && (
                    <>
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() =>
                          handleStatusChange(booking._id, "confirmed")
                        }
                        className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Check size={15} />
                        {isLoading ? "Updating..." : "Confirm"}
                      </button>

                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() =>
                          handleStatusChange(booking._id, "rejected")
                        }
                        className="flex items-center gap-1 rounded-lg border border-red-300 px-3 py-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X size={15} />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-gray-500">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
}
