import { client } from "@/sanity/lib/client";
import { AnyARecord } from "dns";
import { getNamedRouteRegex } from "next/dist/shared/lib/router/utils/route-regex";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const {description,
          shortDescription,
          images,
          name,
          tags,
          price} = await request.json();
        

        let product = {
          _type: "product",
          description,
          shortDescription,
          images,
          name,
          tags,
          price
        }

        let set:any = await client.create(product)

        console.log(")()()()(",product)
        return NextResponse.json({
          message:product
        },{
          status:200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
          message:"Errr"
        },{
          status:500
        })
    }
}
