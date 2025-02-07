"use client"
import { useContext, useEffect } from 'react'
import Achievement from '../component/achievement/Achievement'
import HeroBanner from '../HeroBanner/HeroBanner'
import Cart from './Cart'
import { StoreData } from '../store/StoreContext'
import { useRouter } from 'next/navigation'


const page = () => {

  let {user, GetUser } = useContext(StoreData);
  let router = useRouter()

  
  useEffect(()=>{
    GetUser();

    if(!user){
      console.log("Excecute...")
      router.push('/auth/login')
    }
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