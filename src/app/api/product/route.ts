import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  
  try {
    let productId = await request.json();
    console.log("__________________",productId)
   let res =  await client.delete(productId._id);
   return NextResponse.json(res)
  } catch (error) {
      console.log(error);
      return NextResponse.json(error)
  }
}
