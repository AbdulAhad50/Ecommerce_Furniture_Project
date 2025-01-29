"use client";  // This ensures the component is treated as a Client Component

import Image from "next/image";
import style from './card.module.css';
import { FaEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { useContext } from "react";
import { StoreData } from "@/app/store/StoreContext";
import { MdCompareArrows } from "react-icons/md";
import { toast } from "react-toastify";

const Card = ({ price, discountPercentage, name, id, description, image, bgDisc }:{price:number, discountPercentage:number, name:string, id:string, description:string, image:string, bgDisc:string}) => {

  const { addProduct, favouriteProduct, CompareProduct } = useContext(StoreData);

  const truncateText = (text:string, length = 15) => {
    if (text?.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  };

  const Adding = () => {
    addProduct(name, price, image, id, 0);
    toast.success("Added Product in Card")
  };

  const AddingFavItem = () => {
    favouriteProduct(name, price, image, id);
    toast.success("Added Favourite Product")
  };

  const Compare = () => {
    CompareProduct(id);
    // window.location.href = '/comparison';
  };

  return (
    <div className={`relative w-[285px] h-[446px] ${style.MainDiv}`}>
      <div className='w-[285px] h-[301px]'>
        <Image 
          src={`/${image}.jpg`}
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
          {discountPercentage === 0 ? "" : (
            <span className={`${style.cardRealDiscount}`}>
              <s>Rp {price + (price * (discountPercentage) / 100)}</s>
            </span>
          )}
        </p>
      </div>

      {/* Discount badge */}
      <div className={`absolute flex justify-center items-center top-3 right-3 z-10 w-[48px] h-[48px] rounded-full 
        ${bgDisc === 'red' ? "bg-[#E97171]" : null} ${style.cardDiscount}`}>
        {discountPercentage === 0 ? "" : discountPercentage}
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
            <span onClick={AddingFavItem}>Like</span>
          </div>

          <div className={`${style.HoverEffectCardStyle} flex items-center gap-2`}>
            <MdCompareArrows onClick={Compare} />
            <button onClick={Compare}><Link href={"/comparison"}>Compare</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
