import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SignupUser } from "@/model/signup";
import { dbData } from "@/helper/db";

await dbData();

export async function GET(request: NextRequest) {
  const authToken: string | undefined = request.cookies.get("loginToken")?.value;

  if (!authToken) {
    // Handle the case where authToken is undefined (e.g., return an error response).
    return NextResponse.json({ error: 'Authentication token is missing' }, { status: 400 });
  }

  // Now authToken is guaranteed to be a string
  let data: JwtPayload | string;
  
  try {
    data = jwt.verify(authToken, "aaaaaaaaaa");
  } catch (error) {
    // Handle invalid token (optional)
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  // Narrow down the type to JwtPayload and access _id
  if (typeof data !== "string" && data._id) {
    const user = await SignupUser.findOne({
      _id: data._id
    }).select("-password");

    return NextResponse.json({
      user
    });
  }

  // If data is not the expected JwtPayload
  return NextResponse.json({ error: 'Invalid token data' }, { status: 400 });
}
