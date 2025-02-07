import { dbData } from "@/helper/db";
import { Order } from "@/model/productBuy";
import { NextRequest, NextResponse } from "next/server";


await dbData()

export async function POST(request:NextRequest){
  try {

    let user = await request.json()
    console.log(user)

    let data = await Order.find();

    
    return NextResponse.json(data,{
      status:200
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message:"Error"
    },{
      status:500
    })
  }
}


export async function GET(){
  try {

    let data = await Order.find();
    
    return NextResponse.json(data,{
      status:200
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message:"Error"
    },{
      status:500
    })
  }
}