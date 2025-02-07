import { dbData } from "@/helper/db";
import { Order } from "@/model/productBuy";
import { NextRequest, NextResponse } from "next/server";

await dbData()

export async function POST(request:NextRequest){
    try {

      const [product, user, paymentmethod] = await request.json();
      console.log("Incoming data:", product, user, paymentmethod);

      let data = new Order({
          user:{
            _id:user._id,
            username:user.username,
            email:user.email
          },
          paymentMethod:paymentmethod,
          products:[product],
          totalOrderPrice:product.totalPrice
      })

      await data.save()

      return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
          message:error,
        },{
          status:500
        })
    }
}