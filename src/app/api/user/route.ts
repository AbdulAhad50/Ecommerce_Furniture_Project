import { dbData } from "@/helper/db";
import { SignupUser } from "@/model/signup";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

await dbData()


export async function GET(request:NextRequest){

    try {
        let Users = await SignupUser.find();
        return NextResponse.json(Users,{
            status:202
        })
    } catch (error) {
        console.log("Users Not Get", error);
        return NextResponse.json({
            message:"Users Not Found"
        },{
            status:404
        })
    }
    
    return NextResponse.json({name:"DB"})
}

export async function POST(request:NextRequest){
    let {username, email, password} = await request.json();

    try{
        let user_created = new SignupUser({
            username, email, password
        })

        user_created.password = bcrypt.hashSync(user_created.password, 10)
    
        await user_created.save();
    
        return NextResponse.json(user_created,{
            status:200
        })
    }catch(err){
        return NextResponse.json({
            message:"User Not SignUp"
        },{
            status:500
        })
    }
}