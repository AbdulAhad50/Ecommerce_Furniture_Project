import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_STRIPE_KEY as string);

export async function GET(request:NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" });
  }
  
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 10,
    });

    return NextResponse.json({ paymentIntents });
  } catch (error: any) {
    console.error("Error fetching payment intents:", error);
    return NextResponse.json({ error: error.message });
  }
}
