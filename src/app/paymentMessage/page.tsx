import React from 'react'
import HeroBanner from '../HeroBanner/HeroBanner'
import { IoCloudDone } from "react-icons/io5";
import Link from 'next/link';

const PaymentMessage = () => {
  return (
    <div className='max-w-[1440px] h-[100vh]'>
          <HeroBanner crumbs={'Payment'} pageName={'Payment'}/>

          <div className='flex justify-center items-center flex-col mb-10'>
                <IoCloudDone className='text-[150px] text-green-400'/>
                <h1 className='text-[28px]'>Thanks For Order</h1>
                <Link href="/">
                <button className='w-[400px] h-[50px] text-white bg-black rounded-sm mb-16'>
                        Go To Home page
                </button>
                </Link>
          </div>

          
    </div>
  )
}

export default PaymentMessage