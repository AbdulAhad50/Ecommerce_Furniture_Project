import React from 'react'
import HeroBanner from '../HeroBanner/HeroBanner'
import Checkout from './Checkout'
import Achievement from '../component/achievement/Achievement'

const page = () => {
  return (
    <div className='max-w-[1440px] mx-auto'>
        <HeroBanner crumbs={'Checkout'} pageName={'Checkout'} />
        <div className='mt-7'>
           <Checkout/>
        </div>
        <Achievement/>
    </div>
  )
}

export default page