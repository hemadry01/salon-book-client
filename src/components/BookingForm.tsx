"use client";
import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { IService } from "@/type/service";
import { toast } from "./ui/toast";

import {
  CalendarDays,
  Clock,
  User,
  Mail,
  CheckCircle2,
  Tag,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import useMinDate from "@/lib/useMinDate";

interface IBookingUser {
  id: string;
  name: string;
  email: string;
}

interface BookingFormProps {
  service: IService;
  user: IBookingUser;
  token: string;
}

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

const BookingForm = ({ service, user, token }: BookingFormProps) => {
  const router = useRouter();

  // const { data: session } = authClien.useSession();
  // const user = session?.user;

  const [loading, setLoading] = useState(false);
  // const [minDate, setMinDate] = useState("");

  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    specialRequest: "",
  });

  // Set minimum appointment date after component mounts
  const minDate = useMinDate();

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Convert 12-hour time to 24-hour time
  const convertTime = (time: string) => {
    const [clock, period] = time.split(" ");
    const [parsedHours, minutes] = clock.split(":").map(Number);

    let hours = parsedHours;

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  // Submit booking
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (!user?.id || !user?.name || !user?.email) {
      toast.add({
        title: "Login Required",
        description: "Please login before booking.",
      });

      return;
    }

    if (!formData.appointmentDate || !formData.appointmentTime) {
      toast.add({
        title: "Missing Information",
        description: "Please select appointment date and time.",
      });

      return;
    }

    if (formData.appointmentDate < minDate || !minDate) {
      toast.add({
        title: "Invalid Date",
        description: "Please select a valid appointment date.",
      });

      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        serviceId: service._id,
        date: formData.appointmentDate,
        time: convertTime(formData.appointmentTime),
        specialRequest: formData.specialRequest,
      };

      const res = await fetch("http://localhost:8000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.add({
          title: result.message || "Booking Failed",
          description: "Please try again.",
        });

        return;
      }

      toast.add({
        title: "Booking Successful",
        description: "Your appointment request has been submitted.",
      });

      router.push("/services");
      router.refresh();
    } catch (error) {
      console.error("Booking error:", error);

      toast.add({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const imageUrl = service.image?.trim();

  return (
    <section className="min-h-screen bg-slate-50 py-10 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/services"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Services
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Book Your Appointment
          </h1>

          <p className="mt-2 text-gray-500">
            Complete the form below to schedule your salon visit.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Booking Form */}
            <div className="space-y-7 lg:col-span-2">
              {/* Customer Information */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      Customer Information
                    </h2>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                      Logged In
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-400">
                    Your account information is automatically added.
                  </p>
                </div>

                {/* User Profile */}
                <div className="mb-6 flex items-center gap-4 rounded-xl bg-blue-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {user?.name || "Loading user..."}
                    </h3>

                    <p className="text-xs text-gray-500">
                      Authenticated Customer
                    </p>
                  </div>

                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5">
                    <Mail className="h-5 w-5 text-gray-400" />

                    <span className="text-sm text-gray-600">
                      {user?.email || "Email not available"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Appointment Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Choose your preferred date and time.
                  </p>
                </div>

                {/* Date */}
                <div className="mb-7 space-y-2">
                  <label
                    htmlFor="appointmentDate"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <CalendarDays size={18} className="text-blue-600" />
                    Appointment Request Date *
                  </label>

                  <input
                    id="appointmentDate"
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    min={minDate || undefined}
                    onChange={handleChange}
                    required
                    disabled={!minDate}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Time */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Clock size={18} className="text-blue-600" />
                    Appointment Time *
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            appointmentTime: time,
                          }))
                        }
                        className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                          formData.appointmentTime === time
                            ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                            : "border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Request */}
                <div className="mt-7 space-y-2">
                  <label
                    htmlFor="specialRequest"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Special Request (Optional)
                  </label>

                  <textarea
                    id="specialRequest"
                    name="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write any special instructions..."
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Booking Summary
                </h2>

                {/* Service Image */}
                <div className="relative mb-5 h-48 overflow-hidden rounded-xl bg-gray-100">
                  {imageUrl?.trim() ? (
                    <Image
                      src={imageUrl}
                      alt={service.name || "Service image"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Service Details */}
                <div className="mb-5">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {service.category}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-gray-900">
                    {service.name}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                    {service.description}
                  </p>
                </div>

                {/* Booking Details */}
                <div className="space-y-4 border-y border-gray-100 py-5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <Tag size={17} />
                      Service Price
                    </span>

                    <span className="font-semibold text-gray-900">
                      ৳{service.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={17} />
                      Duration
                    </span>

                    <span className="font-semibold text-gray-900">
                      {service.duration} minutes
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays size={17} />
                      Date
                    </span>

                    <span className="text-right text-sm font-semibold text-gray-900">
                      {formData.appointmentDate || "Not selected"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={17} />
                      Time
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                      {formData.appointmentTime || "Not selected"}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-5">
                  <span className="font-bold text-gray-900">Total Price</span>

                  <span className="text-2xl font-bold text-blue-600">
                    ৳{service.price}
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !minDate}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      Confirm Booking
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                  Your appointment request will be submitted for confirmation.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
