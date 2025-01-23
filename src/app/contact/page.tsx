import React from 'react'
import HeroBanner from '../HeroBanner/HeroBanner'
import style from './contact.module.css'
import Contact from './Contact'
import Achievement from '../component/achievement/Achievement'



const page = () => {
  return (
    <div className={`max-w-[1440px] mx-auto`}>
        <HeroBanner crumbs={'Contact'} pageName={'Contact'}/>

        <div className={`flx flex-col gap-4 mt-8`}>
              <h1 className={`${style.contactHeading}`}>Get In Touch With Us</h1>
              <p className={`${style.contactDetail}`}>For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
        </div>

        <Contact/>
        <Achievement/>
    </div>
  )
}

export default page