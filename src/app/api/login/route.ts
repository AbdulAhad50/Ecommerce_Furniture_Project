import { dbData } from "@/helper/db";
import { SignupUser } from "@/model/signup";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

await dbData();

export async function POST(request: NextRequest) {
  let { email, password } = await request.json();

  try {
    const user = await SignupUser.findOne({
      email: email
    });

    if (user == null) {
      throw new Error("User Not Found !!");
    }

    const matched = bcrypt.compareSync(password, user.password);

    if (!matched) {
      throw new Error("Password Not Matched !!");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name
      },
      "aaaaaaaaaa"
    );

    console.log("token", token);

    const response = NextResponse.json(
      {
        message: "Logged In Success",
        success: true
      },
      {
        status: 201
      }
    );

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    
    response.cookies.set("loginToken", token, {
      expires: expiryDate,
      httpOnly: true, 
    });

    return response; // Return the response where the cookie is set

  } catch (err) {
    console.log("Error", err);
    return NextResponse.json(
      {
        message: "User Not Found"
      },
      {
        status: 404
      }
    );
  }
}
