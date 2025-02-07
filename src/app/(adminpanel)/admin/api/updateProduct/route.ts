import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";


export async function  POST(request:NextRequest) {
  try {

    let requestData = await request.json();
    const response = await client.patch(requestData[0])
      .set(requestData[1])  // Jo fields update karni hain
      .commit();

    console.log('Product updated successfully:');
    return NextResponse.json({
        Message:response
    },{
      status:200
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({
      message:"err"
    },{
      status:500
    })
  }
};
