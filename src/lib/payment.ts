const BASE_URL = "http://localhost:8000";

interface CreatePaymentResponse {
  success: boolean;
  message?: string;
  url?: string;
  sessionId?: string;
  [key: string]: unknown;
}

export async function createdPayment(
  serviceId: string,
  userId: string,
  bookingId: string,
): Promise<CreatePaymentResponse> {
  try {
    const res = await fetch(`${BASE_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceId,
        userId,
        bookingId,
      }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Payment session creation failed.",
      };
    }

    return data;
  } catch (error) {
    console.error("Payment creation failed:", error);

    return {
      success: false,
      message:
        "Something went wrong while creating the payment. Please try again.",
    };
  }
}
