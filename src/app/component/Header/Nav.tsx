"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { BsPersonFillExclamation } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { MenuIcon } from "lucide-react";
import DesktopCart from "@/app/DesktopCart/DesktopCart";
import { StoreData } from "@/app/store/StoreContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import style from "./nav.module.css";

const Nav = () => {
  const [search, setSearch] = useState("");
  const { data, Search } = useContext(StoreData);

  function Searching() {
    console.log(search);
    Search(search);
  }

  return (
    <div
      className={`max-w-[1440px] h-[70px] items-center flex justify-between ${style.shadow} mx-[auto] bg-white gap-[4vw] px-[10vw]`}
    >
      {/* {Logo Side} */}
      <div className="flex md:gap-3 mr-4">
        <Image src={"/Nav/Logo.svg"} alt={""} width={40} height={40} />
        <h1 className={`${style.logoFont}`}>Furniro</h1>
      </div>

      {/* {Links Side} */}
      <div className={`hidden sm:ml-4 md:flex`}>
        <ul className={`flex gap-[3vw] ${style.linksFont}`}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/shop"}>Shop</Link>
          </li>
          <li>
            <Link href={"/cart"}>Cart</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>

      <div className="hidden md:flex">
        <ul className="flex items-center gap-[2vw] text-[20px]">
          <li>
            <Link href={"/profile"}>
              <BsPersonFillExclamation />
            </Link>
          </li>
          <li className="mt-2">
            <Popover>
              <PopoverTrigger>
                <CiSearch />
              </PopoverTrigger>
              <PopoverContent>
                <input
                  type="text"
                  placeholder="Search"
                  className={`${style.Search}`}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className={`${style.SearchBtn} mt-[5px]`} onClick={Searching}>
                  Search
                </button>
              </PopoverContent>
            </Popover>
          </li>
          <li>
            <Link href={"/favourite"}>
              <CiHeart />
            </Link>
          </li>
          <li>
            <Link href={""}>
              <Sheet>
                <SheetTrigger className="flex">
                  <BsCart3 />
                  <span
                    className={`position-absolute top-0 right-0 start-100 translate-middle badge rounded-pill ${style.bedge}`}
                  >
                    {data.length}
                  </span>
                </SheetTrigger>
                <SheetContent>
                  <DesktopCart />
                </SheetContent>
              </Sheet>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger className="flex md:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <ul className={`flex flex-col gap-[3vw] ${style.linksFont}`}>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/shop"}>Shop</Link>
            </li>
            <li>
              <Link href={"/cart"}>Cart</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Nav;
