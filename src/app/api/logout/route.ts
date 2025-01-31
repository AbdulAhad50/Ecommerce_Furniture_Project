import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const res = NextResponse.json({
      message:"",
      success : true
    },{
      status:202
    });

    res.cookies.set('loginToken', "" , {
      expires:new Date(0)
    })

    return res
}