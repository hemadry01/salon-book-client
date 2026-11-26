import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";


export async function POST() {

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const email = session?.user.email
    const user = session?.user.name
    const usId = session?.user.id
     
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1UehSjRUclS8x6XvUvnrrADU",
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      metadata: {
        userId: usId ?? null,
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: "salon_book_web_001",
    });
    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }
}
