import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe (specify your API version as needed)
const stripe = new Stripe(process.env.SECRET_STRIPE_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Incoming data:", data);

    // Validate that product data exists
    if (
      !data[0] ||
      !data[0].totalName ||
      !data[0].totalQuantity ||
      !data[0].singleProductPrice
    ) {
      throw new Error("Select Product and ensure all product details are provided.");
    }

    // Create a Stripe customer using the provided user data
    const customer = await stripe.customers.create({
      name: data[1].username,
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
      email: data[1].email,
    });

    const line_items = data[0].totalName
      .map((name: string, index: number) => {
        const quantity = data[0].totalQuantity[index];
        if (!quantity || quantity <= 0) {
          return null;
        }
        const unit_amount = data[0].singleProductPrice[index];
        if (unit_amount == null || typeof unit_amount !== "number") {
          throw new Error(`Invalid price for product "${name}"`);
        }
        // Convert price from dollars to cents by multiplying by 100
        const amountInCents = Math.round(unit_amount * 100);
        return {
          quantity: quantity,
          price_data: {
            currency: "USD",
            unit_amount: amountInCents,
            product_data: {
              name: name,
            },
          },
        };
      })
      .filter((item: any) => item !== null);

    const totalPrice = line_items.reduce((acc: number, item: any) => {
      return acc + item.quantity * item.price_data.unit_amount;
    }, 0);
    console.log("Total Price (in cents):", totalPrice);

    console.log("Line items:", line_items);

    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://localhost:3000/shop",
      cancel_url: "http://localhost:3000",
      line_items: line_items,
      customer: customer.id,
    });

    return NextResponse.json(
      {
        message: checkOutSession,
        url: checkOutSession.url,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in Checkout Session:", err);
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}
