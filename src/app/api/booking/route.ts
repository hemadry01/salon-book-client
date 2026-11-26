import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // Verify Better Auth session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login before booking.",
        },
        { status: 401 },
      );
    }

    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 },
      );
    }

    const { serviceId, date, time, specialRequest } = body;

    if (!serviceId || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          message: "Service, date and time are required.",
        },
        { status: 400 },
      );
    }

    // Server-to-server secret
    const internalSecret = process.env.INTERNAL_API_SECRET;
    const baseUrl = process.env.BASE_URL;

    if (!internalSecret || !baseUrl) {
      console.error("INTERNAL_API_SECRET or BASE_URL is not configured");

      return NextResponse.json(
        {
          success: false,
          message: "Booking service is not configured.",
        },
        { status: 500 },
      );
    }

    const response = await fetch(`${baseUrl}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-api-secret": internalSecret,
      },
      body: JSON.stringify({
        serviceId,
        date,
        time,
        specialRequest,

        // Identity comes from the verified Better Auth session
        userId: session.user.id,
        customerName: session.user.name || "Customer",
        customerEmail: session.user.email,
      }),
      cache: "no-store",
    });

    const result = await response.json().catch(() => null);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Unexpected response from booking service.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process booking.",
      },
      { status: 500 },
    );
  }
}
