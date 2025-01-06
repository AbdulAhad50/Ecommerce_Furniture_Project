import Image from "next/image"
import Link from "next/link"
import style from './nav.module.css'
import { BsPersonFillExclamation } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";



const Nav = () => {
  return (
    <div className={`max-w-[1440px] h-[70px] items-center flex justify-evenly ${style.shadow}  mx-[auto] bg-white`}>

      {/* {Logo Side} */}

          <div className="flex gap-3">
              <Image src={"/Nav/Logo.svg"} alt={""} width={40} height={40}/>
              <h1 className={`${style.logoFont}`}>Furniro</h1>
          </div>


    {/* {Links Side } */}

          <div className={`hidden md:flex`}>
              <ul className={`flex gap-[2vw] ${style.linksFont}`}>
                  <li><Link href={"/"}>Home</Link></li>
                  <li><Link href={"/shop"}>Shop</Link></li>
                  <li><Link href={"/blog"}>Blog</Link></li>
                  <li><Link href={"/contact"}>Contact</Link></li>
              </ul>
          </div>

          <div>
              <ul className="flex gap-[1.4vw] text-[1.5vw]">
                <li><BsPersonFillExclamation/></li>
                <li><CiSearch/></li>
                <li><CiHeart/></li>
                <li><BsCart3/></li>
              </ul>
          </div>
    </div>
  )
}

export default Nav