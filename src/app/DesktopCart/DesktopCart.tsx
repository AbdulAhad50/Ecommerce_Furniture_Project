"use client"

import Image from "next/image";
import Link from "next/link";
import { BsBagX } from "react-icons/bs";
import style from './carts.module.css'
import { TiDelete } from "react-icons/ti";
import { useContext, useState } from "react";
import { StoreData } from "../store/StoreContext";




const DesktopCart = () => {

    // let [dataFind, setDataFind] = useState<any[]>([])
    // let {data} = useContext(StoreData)

    // // setDataFind(data);
    // console.log("___",data)

  return (
    <div className="relative w-[380px] flex flex-col items-center mt-8 h-[446px] bg-white pr-[40px]">

        {/* {
            data.map((elem,i)=>{
                
                return <div key={i}>{elem}</div>
            })

        } */}


        <div className={`w-[350px] flex justify-between items-center gap-5 mb-4 ${style.cartTopBorder}`}>
            <h1 className={`${style.cartTopHeading}`}>Shopping Cart</h1>
            <BsBagX className="text-[#9F9F9F]"/>
        </div>

        <div className={`w-[350px] justify-between flex items-center gap-5 mt-3`}>
            <div className="w-[105px] h-[105px] rounded-[15px]">
                <Image src={"/card/image1.svg"} alt={""} width={108} height={105} className="w-full h-full rounded-[10px]"/>
            </div>

            <div className="flex flex-col gap-3">
                <h5 className={`${style.cartProductName}`}>Asgaard syfa</h5>
                <div>
                  <span className={`${style.cartProductQuantityStyle}`}>1 &nbsp; x  &nbsp;</span>
                  <span className={`${style.cartProductPriceStyle}`}>250,000.00</span>
                </div>
            </div>
            <TiDelete className="text-[#9F9F9F] text-[30px]"/>
        </div>

        <div className="absolute bottom-0">
            <div className={`w-[350px] justify-between flex items-center gap-5`}>
                <h2 className={`${style.cartBottomSubTotal}`}>Subtotal</h2>
                <p className={`${style.cartBottomSubTotalPrice}`}>Rs. 520,000.00</p>
            </div>
            
            <div className={`w-[350px] justify-between flex items-center gap-5 ${style.cartBottom}`}>
                <button className={`${style.cartBottomBtn}`}><Link href={"/cart"} >Cart</Link></button>
                <button className={`${style.cartBottomBtn2}`}><Link href={"/checkout"}>Checkout</Link></button>
            </div>

        </div>
    </div>
  )
}

export default DesktopCart