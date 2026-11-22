export interface IBooking {
  _id: string;
  serviceId: string;
  userId: string;

  customerName: string;
  customerEmail: string;

  date: string;
  time: string;

  specialRequest: string;

  serviceName: string;
  price: number;
  duration: number;

  status: "pending" | "confirmed" | "rejected" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";

  approved: boolean;
  createdAt: string;
}
