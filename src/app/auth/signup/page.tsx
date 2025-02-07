"use client";
import { useState } from "react";
import { GoPersonAdd } from "react-icons/go";
import { TfiEmail } from "react-icons/tfi";
import { CiPhone } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Link from "next/link";
import { toast } from "react-toastify";
import { Signup } from "@/services/userdata";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

const SignUp = () => {

    let [signup, setSign] = useState(true)
    let route = useRouter()
    let [data , setData] = useState({
      username:"",
      email:"",
      phoneNumber:"",
      password:""
    })

    async function SignUp(event:any){
      event.preventDefault()
      console.log(data)

      if(data.username === '' || data.password === "" || data.email === "" || data.phoneNumber === ""){

        toast.warning("All fields Are required")
        return ;
      }

      try{
        setSign(false)
        const result = await Signup(data);
        toast.success('Signup Successfully')
        setData({
          username:"",
          email:"",
          phoneNumber:"",
          password:""
        })

        route.push("/auth/login")

      }catch(err:any){
        setSign(true)
          console.log("Errr...", err)
          toast.error("Error !!", err)
      }
    }


  return (
    <div className={`max-w-[1440px] mx-auto`}>
      <div
        className={`max-w-[500px] h-[700px] border border-gray-400 mx-auto my-8 rounded-[10px]`}
      >
        <div className="mt-4">
          <h1 className="text-[36px] text-center font-bold">
            Create an account
          </h1>
          <p className="text-[20px] text-gray-400 text-center">
            Enter your details below to create your account
          </p>
        </div>

        <form action="#!" onSubmit={SignUp} className="flex flex-col gap-3 pl-[35px] mt-10 my-4">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="name" className="font-sans">
              User Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              className="relative border border-gray-300 outline-none max-w-[420px] h-[40px] rounded-[5px] pl-[40px] "
              placeholder={`jhondoe`}
              onChange={(e)=>{
                setData({
                  ...data,
                  username:e.target.value
                })
              }}

              value={data.username}
            />

            <GoPersonAdd className="absolute bottom-3 left-3" />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="email" className="font-sans">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 outline-none max-w-[420px] h-[40px] rounded-[5px] pl-[40px]"
              placeholder="testing@gmail.com"
              onChange={(e)=>{
                setData({
                  ...data,
                  email:e.target.value
                })
              }}

              value={data.email}
            />

            <TfiEmail className="absolute bottom-3 left-3" />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="number" className="font-sans">
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              className="border border-gray-300 outline-none max-w-[420px] h-[40px] rounded-[5px] pl-[40px]"
              placeholder="+92090909890"

              onChange={(e)=>{
                setData({
                  ...data,
                  phoneNumber:e.target.value
                })
              }}

              value={data.phoneNumber}
            />

            <CiPhone className="absolute bottom-3 left-3" />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="font-sans">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 outline-none max-w-[420px] h-[40px] rounded-[5px] pl-[40px]"
              onChange={(e)=>{
                setData({
                  ...data,
                  password:e.target.value
                })
              }}

              value={data.password}
            />

            <CiLock className="absolute bottom-3 left-3" />
          </div>

          <button
            type="submit"
            className="mt-6 max-w-[420px] font-bold text-white rounded-[10px] h-14 bg-gradient-to-t from-sky-500 to-indigo-500"
          >
            {signup ? "Create Account" : "Create Account..."}
          </button>
        </form>

        <div>
            <p className="text-[18px] mt-6 text-gray-400 text-center">Already have an account? <Link href="/auth/login" className="text-blue-700 font-bold">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
