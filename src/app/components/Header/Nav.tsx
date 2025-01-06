import Image from "next/image"
import Link from "next/link"
import style from './nav.module.css'
import { BsPersonFillExclamation } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import {
  Sheet,
  SheetContent,

  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react";




const Nav = () => {
  return (
    <div className={`max-w-[1440px] h-[70px] items-center flex justify-between ${style.shadow}  mx-[auto] bg-white gap-[4vw] px-[10vw]`}
    
    >

      {/* {Logo Side} */}

          <div className="flex md:gap-3 mr-4">
              <Image src={"/Nav/Logo.svg"} alt={""} width={40} height={40}/>
              <h1 className={`${style.logoFont}`}>Furniro</h1>
          </div>


    {/* {Links Side } */}

          <div className={`hidden sm:ml-4  md:flex `}>
              <ul className={`flex gap-[3vw] ${style.linksFont}`}>
                  <li><Link href={"/"}>Home</Link></li>
                  <li><Link href={"/shop"}>Shop</Link></li>
                  <li><Link href={"/blog"}>Blog</Link></li>
                  <li><Link href={"/contact"}>Contact</Link></li>
              </ul>
          </div>

          <div className="hidden md:flex">
              <ul className="flex items-center gap-[2vw] text-[20px]">
                <li><Link href={""}><BsPersonFillExclamation/></Link></li>
                <li><Link href={""}><CiSearch/></Link></li>
                <li><Link href={""}><CiHeart/></Link></li>
                <li><Link href={""}><BsCart3/></Link></li>
              </ul>
          </div>


          <Sheet>
              <SheetTrigger className="flex md:hidden">
                <MenuIcon/>
              </SheetTrigger>
              <SheetContent>
              <ul className={`flex flex-col gap-[3vw] ${style.linksFont}`}>
                  <li><Link href={"/"}>Home</Link></li>
                  <li><Link href={"/shop"}>Shop</Link></li>
                  <li><Link href={"/blog"}>Blog</Link></li>
                  <li><Link href={"/contact"}>Contact</Link></li>
              </ul>
              </SheetContent>
          </Sheet>

    </div>
  )
}

export default Nav