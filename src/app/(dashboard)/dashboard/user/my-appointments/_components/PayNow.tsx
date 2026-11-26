"use client"
import { toast } from '@/components/ui/toast';
import { createdPayment } from '@/lib/payment';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import React from 'react';

interface PayNowProps {
  serviceId: string;
  userId: string;
  bookingId: string;
}


const PayNowButton = ({ serviceId, userId, bookingId }: PayNowProps) => {
  const handlePayment = async () => {
    try {
      

      const res = await createdPayment(serviceId, userId, bookingId);
     if (res.success && res.url) {
       window.location.href = res.url;
     } else {
    //    alert(res.message || "Payment failed");
    toast.add({
      title: res.message,
      description: "Payment failed",
    });
     }
    } catch (error) {
      console.log("Error creating service", error);
      toast.add({
        title: "Error",
        description: "Something wrong",
      });
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className="mt-7 h-12 w-full flex items-center justify-between px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md"
      >
        <LockKeyhole size={17} />
            PayNow
        <ArrowRight size={17} />
      </button>
    </div>
  );
};

export default PayNowButton;