// import React, { useContext } from 'react'
import HeroBanner from '../HeroBanner/HeroBanner'
import Cart from './Cart'
import Achievement from '../components/achievement/Achievement'


const page = () => {

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