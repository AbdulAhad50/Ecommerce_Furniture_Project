"use client";
import { useContext, useEffect, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import Link from "next/link";
import { toast } from "react-toastify";
import { Login } from "@/services/userdata";
import { useRouter } from "next/navigation";
import { StoreData } from "@/app/store/StoreContext";
import axios from 'axios'

const LoginForm = () => {

  let [login, setLogin] = useState(true)

  
  let router = useRouter()

  let [data , setData] = useState({
      email:"",
      password:""
    })

    async function LoginData(event:any){
      event.preventDefault()
      console.log(data)

      if( data.password === "" || data.email === ""){

        toast.warning("All fields Are required")
        return ;
      }

      try {
        setLogin(false)
        let res = await axios.post('/admin/api/sign', data);
        console.log(res)
        toast.success("Logged In Successfully")
        window.location.href= "/admin/dash"
      } catch (error:any) {
        setLogin(true)
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }


  return (
    <div className={`max-w-[1440px] mx-auto py-10`}>
      <div
        className={`max-w-[500px] h-[500px] border bg-white border-gray-400 mx-auto rounded-[10px]`}
      >
        <div className="mt-4">
          <h1 className="text-[36px] text-center font-bold">
          Admin Panel
          </h1>
          <p className="text-[20px] text-gray-400 text-center">
          Enter your credentials to access your account
          </p>
        </div>

        <form action="#!" onSubmit={LoginData} className="flex flex-col gap-3 pl-[35px] mt-10 my-4">

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
            className={`mt-6 max-w-[420px] font-bold text-white rounded-[10px] h-14 bg-gradient-to-t from-sky-500 to-indigo-500 hover:bg-blue-600`}
          >
            {login ? "Login" : "Login..."}
          </button>
        </form>

        <div>
            <p className="text-[18px] mt-6 text-gray-400 text-center">Don't have an account?  <Link href="/auth/signup" className="text-blue-700 font-bold">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
