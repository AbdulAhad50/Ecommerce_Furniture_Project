// import { Signup } from "@/model/signup";
import mongoose from "mongoose";

export const dbData = async () =>{
    try{
        const data = await mongoose.connect("mongodb+srv://motivate:Makhan50@cluster0.wgpao.mongodb.net/",{
            dbName:"user_detailed"
        })

        console.log("Database Connected");
        console.log(data)
    }catch(err){
        console.log("Database Not Connect");
    }
} 