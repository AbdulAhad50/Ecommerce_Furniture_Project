"use client"

import Image from "next/image";
import React, { useContext, useState } from "react";
import style from "./product.module.css";
import { Rating } from "@mui/material";
import { StoreData } from "../store/StoreContext";
// import Rating from "./Rating";

const View = ({productName,productPrice,rating,ProductDescription,image,id}:{productName:string, productPrice:number, ProductDescription:string, rating:number , id:string, image: { asset: { _ref: string; _type: string }; _type: string }, }) => {

  let {addProduct} = useContext(StoreData);

  let [quantity, setCount] = useState(1)
  
  function Minuscount(){
      if(quantity > 0){
        setCount(quantity - 1)
      }
  }
  
  function addCart(){
    addProduct(productName,productPrice,image,id,quantity)
  }

  return (
    <div className={`flex ${style.MainProductStyle}`}>
{/* 1 */}
      <div className={`flex gap-3 my-7 mx-6 ml-10 ${style.ProductImage}`}>

        <div className={`flex flex-col gap-3 mt-3 ${style.MultiProductImage}`}>
          <div className={`w-[90px] h-[90px] rounded-[10px]`}>
            <Image
              src={"/card/image1.svg"}
              alt={""}
              width={90}
              height={90}
              className="w-full h-full rounded-[10px]"
            />
          </div>

          <div className={`w-[90px] h-[90px] rounded-[10px]`}>
            <Image
              src={"/card/image1.svg"}
              alt={""}
              width={90}
              height={90}
              className="w-full h-full rounded-[10px]"
            />
          </div>
          <div className={`w-[90px] h-[90px]  rounded-[10px]`}>
            <Image
              src={"/card/image1.svg"}
              alt={""}
              width={90}
              height={90}
              className="w-full h-full rounded-[10px]"
            />
          </div>
          <div className={`w-[90px] h-[90px] rounded-[10px]`}>
            <Image
              src={"/card/image1.svg"}
              alt={""}
              width={90}
              height={90}
              className="w-full h-full rounded-[10px]"
            />
          </div>
        </div>

        <div className={`w-[440px] h-[490px] rounded-[10px] ${style.MainImage}`}>
          <Image
            src={"/card/image1.svg"}
            alt={""}
            width={110}
            height={110}
            className={`w-full h-full rounded-[10px] ${style.MainImage}`}
          />
        </div>
      </div>

{/* {div 2} */}
      <div className={`flex flex-col justify-between my-7 mx-6 ml-10 ${style.AddCardItem}`}>
        <div>
          <h1 className={`${style.productName}`}>{productName}</h1>
          <p className={`${style.productPrice}`}>Rs {productPrice}</p>
        </div>

        <div>
            <Rating name="size-medium" defaultValue={rating} readOnly/>
        </div>

        <div>
          <p className={`${style.ProductDescription}`}>
            {
                ProductDescription
            }
          </p>
        </div>

        <div>
          <h3 className={`${style.SizeStyle}`}>Size</h3>

          <div className={`flex gap-5 mt-4`}>
            <button className={`${style.SizeBtn}`}>L</button>
            <button className={`${style.SizeBtn}`}>XL</button>
            <button className={`${style.SizeBtn}`}>XS</button>
          </div>
        </div>

        {/* <div>
          <div></div>
        </div> */}

        <div>
          <div className={`mb-5 flex gap-10 ${style.CardDiv}`}>
            <h3 className={`${style.Btn}`}>
              <button onClick={Minuscount}>-</button>{quantity}<button onClick={()=>setCount(quantity + 1)}>+</button>
            </h3>

            <button className={`${style.AddCard}`} onClick={addCart}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
