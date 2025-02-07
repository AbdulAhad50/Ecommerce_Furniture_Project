import { dbData } from "@/helper/db";
import { SignupUser } from "@/model/signup";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


let Adminpassword = process.env.ADMIN_PASSWORD;
let Adminemail = process.env.ADMIN_EMAIL

await dbData();

export async function POST(request: NextRequest) {
  let { email, password } = await request.json();

  try {
    

    if(password !== Adminpassword){
        throw new Error('password Not Matched')
    }    

   
    const token = jwt.sign(
      {
        email
      },
      "adminkey"
    );

    console.log("token", token);

    const response = NextResponse.json(
      {
        message: {password, Adminpassword},
        success: true
      },
      {
        status: 201
      }
    );

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    
    response.cookies.set("adminToken", token, {
      expires: expiryDate,
      httpOnly: true, 
    });

    return response;

  } catch (err:any) {
    console.log("Error", err);
    return NextResponse.json(
      {
        message: err.message
      },
      {
        status: 404
      }
    );
  }
}
