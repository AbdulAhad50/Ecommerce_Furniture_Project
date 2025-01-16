"use client"  // This makes the component a Client Component

import Image from "next/image";
import style from './card.module.css';
import { FaEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { StoreData } from "@/app/store/StoreContext";

interface ID {
  price: number, 
  discountPercentage: number | string, 
  image: { asset: { _ref: string; _type: string }; _type: string }, 
  description: string, 
  name: string, 
  bgDisc: string, 
  id: string 
}

const Card = ({ price, discountPercentage, name, id, description, image, bgDisc }: ID) => {

  let { addProduct, favouriteProduct } = useContext(StoreData);

  const truncateText = (text: string, length: number = 15) => {
    if (text?.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  const Adding = () => {
    addProduct( name, price, image , id);
  };

  const AddingFavItem = () => {
    favouriteProduct( name, price, image , id);
  };


  return (
    <div className={`relative w-[285px] h-[446px] ${style.MainDiv}`}>
      <div className='w-[285px] h-[301px] '>
        <Image 
          src={"/card/image1.svg"} // Dynamic image URL from props
          alt={name} 
          width={200} 
          height={200} 
          className="w-full h-full" 
        />
      </div>

      <div className="w-[285px] flex flex-col justify-center gap-4 h-[145px] pl-3 bg-[#F4F5F7]">
        <h1 className={`${style.cardHeading}`}>{truncateText(name)}</h1>
        <p className={`${style.cardDetail}`}>{truncateText(description)}</p>
        
        {/* Displaying price with possible discount */}
        <p className={`${style.cardPrice}`}>
          Rp {price} &nbsp; 
          {discountPercentage && (
            <span className={`${style.cardRealDiscount}`}>
              <s>Rp {price + (price * (discountPercentage as number) / 100)}</s>
            </span>
          )}
        </p>
      </div>

      {/* Discount badge */}
      <div className={`absolute flex justify-center items-center top-3 right-3 z-10 w-[48px] h-[48px] rounded-full 
        ${bgDisc === 'red' ? "bg-[#E97171]" : null} ${style.cardDiscount}`}>
        {discountPercentage}
      </div>

      {/* Hover effect */}
      <div className={`absolute z-10 top-0 w-[285px] flex flex-col items-center justify-center h-full ${style.HoverEffectCard}`}>
        <button className={`${style.HoverEffectBtn}`} onClick={Adding}>Add to cart</button>

        <div className="flex gap-6 mt-5">
          <div className={`${style.HoverEffectCardStyle} flex items-center gap-2`}>
            <FaEye />
            <Link href={`/${id}`}>view</Link>
          </div>

          <div className={`${style.HoverEffectCardStyle} flex items-center gap-2`}>
            <FaRegHeart onClick={AddingFavItem}/>
            <span>Like</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
