import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { SignupUser } from "@/model/signup";
import { dbData } from "@/helper/db";

await dbData();

export async function GET(request:NextRequest){
    const authToken:string | undefined =  request.cookies.get("loginToken")?.value;

    const data = jwt.verify(authToken , "aaaaaaaaaa");
    console.log(data);
    const user = await SignupUser.findOne({
      _id:data?._id
    }).select("-password")

    return NextResponse.json({
      user
    })

}