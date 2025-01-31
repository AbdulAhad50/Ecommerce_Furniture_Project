import { NextRequest, NextResponse } from "next/server";
import { SignupUser } from "@/model/signup";
import { dbData } from "@/helper/db";

await dbData()

export async function DELETE(request: NextRequest, {params}:{params:{userId:string}}) {
  const {userId} = params;
  console.log(userId);

  try {
    await SignupUser.deleteOne({
      _id:userId
    })
    return NextResponse.json({ message:"Success", user:"Delete User" });
  } catch (error) {
    console.log("errr", error);
    return NextResponse.json(error)
  }
}


export async function GET(request: NextRequest, {params}:{params:{userId:string}}) {
  const {userId} = params;

  try {
    let user = await SignupUser.findById({
      _id:userId
    })

    return NextResponse.json({
      user
    },{
      status:201
    })
  } catch (error) {
    console.log("Single User Not Get", error);
    return NextResponse.json({
      message:"User Not Found"
    },{
      status:404
    })
  }
}


export async function PUT(request: NextRequest, {params}:{params:{userId:string}}){
  const {userId} = params;
  let {username, password} = await request.json()

  try {
    let updateUser = await SignupUser.findById({
      _id:userId
    })

    updateUser.username = username;
    updateUser.password = password;
    
    const newUpdatedUser = await updateUser.save();

    return NextResponse.json({
      newUpdatedUser
    })


  } catch (error) {
      console.log("User Can't Updated", error);
      return NextResponse.json({message:"User Can't Updated"})
  }
}