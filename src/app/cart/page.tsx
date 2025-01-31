"use client"
import { useContext, useEffect } from 'react'
import Achievement from '../component/achievement/Achievement'
import HeroBanner from '../HeroBanner/HeroBanner'
import Cart from './Cart'
import { StoreData } from '../store/StoreContext'


const page = () => {

  let { GetUser } = useContext(StoreData);

  useEffect(()=>{
    GetUser();
  },[])

  return (
    <div className={`max-w-[1440px] mx-auto`}>
        <HeroBanner crumbs={'Cart'} pageName={'Cart'}/>
        <div>

        <Cart/>
        </div>

        <div className='mt-8'>
            <Achievement/>
        </div>
    </div>
  )
}

export default page