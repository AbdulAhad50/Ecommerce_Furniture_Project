"use client";

import Image from "next/image";
import { RiDashboardLine } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import { useEffect, useState } from "react";
import { DiGoogleAnalytics } from "react-icons/di";
import Link from "next/link";
import { IoLogOut } from "react-icons/io5";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from 'next/navigation';


const SideBar = () => {
  let [dash, setDash] = useState(true);
  let [Products, setProducts] = useState(false);
  let [Customers, setCustomers] = useState(false);
  let [Order, setOrder] = useState(false);
  let [hide, setHide] = useState(true)
  let router = useRouter()
  
  const pathname = usePathname();
  console.log("Pathname",pathname)


  useEffect(()=>{
    if(pathname == '/admin/auth/signin'){
      setHide(false)
    }
  },[])


  function Dash() {
    setDash(true);
    setProducts(false);
    setCustomers(false);
    setOrder(false);
  }

  function Product() {
    setDash(false);
    setProducts(true);
    setCustomers(false);
    setOrder(false);
  }

  function Customer() {
    setDash(false);
    setProducts(false);
    setCustomers(true);
    setOrder(false);
  }

  function Orders() {
    setDash(false);
    setProducts(false);
    setCustomers(false);
    setOrder(true);
  }


  async function AdminLogout(){
      try {

        let res = await axios.post('/admin/api/admin/logout')
        setHide(false)
        router.push('/admin/auth/signin')
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <aside className={`w-[300px] h-[100vh] mx-auto sticky ${hide ?  "" : "hidden"}`}>
      <div className="flex gap-3 mr-4 pt-5 ml-4">
        <Image src={"/Nav/Logo.svg"} alt={""} width={40} height={40} />
        <h1
          className={`font-montserrat text-2xl font-extrabold leading-[41.45px] text-left decoration-none`}
        >
          Furniro
        </h1>
      </div>

      <div className="mt-8 ">
        <ul className="flex flex-col gap-4">
          <Link href="/admin/dash">
            <li
              className={` -b flex gap-4 items-center  -black pl-4 font-bold
                 ${!dash ? `text-gray-300` : "text-black"} pb-4 cursor-pointer`}
              onClick={Dash}
            >
              <RiDashboardLine className={`text-3xl`} />
              Dashboard
            </li>
          </Link>

          <Link href="/admin/products">
            <li
              className={` -b flex gap-4 items-center  -black pl-4 font-bold
                 ${!Products ? `text-gray-300` : "text-black"} pb-4 cursor-pointer`}
              onClick={Product}
            >
              <FiShoppingBag className="text-3xl" />
              Products
            </li>
          </Link>

          <Link href="/admin/analytics">
            <li
              className={` -b flex gap-4 items-center  -black pl-4 font-bold
                    ${!Customers ? `text-gray-300` : "text-black"} pb-4 cursor-pointer`}
              onClick={Customer}
            >
              <DiGoogleAnalytics className="text-3xl" />
              Analytics
            </li>
          </Link>

          <Link href="/admin/order">
            <li
              className={`flex gap-4 items-center pl-4 font-bold
                 ${!Order ? `text-gray-300` : "text-black"} pb-4 cursor-pointer`}
              onClick={Orders}
            >
              <IoMdCart className="text-3xl" />
              Order List
            </li>
          </Link>

          <Link href="">
            <li
              className={`flex gap-4 items-center text-black pl-4 font-bold`} onClick={AdminLogout}>
              <IoLogOut className="text-3xl" />
              Logout
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
