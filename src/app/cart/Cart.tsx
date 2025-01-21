"use client";

import Link from 'next/link';
import style from './cart.module.css';
import Image from 'next/image';
import { AiFillDelete } from "react-icons/ai";
import { useContext } from 'react';
import { StoreData } from '../store/StoreContext';

const Cart = () => {
  const { data, deleteProduct, upDateQuantity, DecreaseQuanity, orderplaced } = useContext(StoreData);

  // Calculate total price correctly
  let total = 0;
  data.map((elem) => {
    total += elem.quantity * elem.price;
    return total;
  });

  function detailsProduct() {
    let totalPrice = 0;
    const totalQuantity = [];
    const totalName = [];
    const singleProductPrice = [];

    data.map((elem) => {
      totalQuantity.push(elem.quantity);
      totalName.push(elem.name);
      singleProductPrice.push(elem.price);
      totalPrice += elem.quantity * elem.price;
      return totalPrice;
    });

    orderplaced(totalPrice, totalQuantity, totalName, singleProductPrice);
  }

  return (
    <div className={`flex gap-10 ${style.smallScreenSizeMain}`}>
      <div className={`flex flex-col gap-6 ${style.smallSizeScreenHeader}`}>
        <div className={` flex justify-between items-center px-[20px] ${style.cartHeader}`}>
          <h2 className={`${style.cartHeaderFontStyle}`}>Product</h2>
          <h2 className={`${style.cartHeaderFontStyle}`}>Price</h2>
          <h2 className={`${style.cartHeaderFontStyle}`}>Quantity</h2>
          <h2 className={`${style.cartHeaderFontStyle}`}>Subtotal</h2>
        </div>
        <div className='flex flex-col'>
          {
            data.map((elem, i) => {
              return (
                <div className={`flex justify-between items-center mt-4 ${style.cartHeaderPrice}`} key={i}>
                  <div className={`w-[110px] flex flex-col gap-4 h-[110px] rounded-[10px] ${style.brandImage}`}>
                    <Image src={"/card/image1.svg"} alt={''} width={108} height={108} className={`w-full h-full rounded-[10px]`} />
                  </div>

                  <h2 className={`${style.realCartPrice}`}>
                    Rs.{elem?.price}
                  </h2>

                  <div className='flex'>
                    <button onClick={() => DecreaseQuanity(elem.id)} className='mr-5'>-</button>
                    <h2 className={`${style.Quantity}`}>
                      {elem.quantity}
                    </h2>
                    <button className='ml-5' onClick={() => upDateQuantity(elem.id)}>+</button>
                  </div>

                  <h2 className={`ml-5 ${style.realCartPrice} flex items-center gap-4`}>
                    {elem.quantity * elem?.price}
                    <AiFillDelete className={`${style.Delete} cursor-pointer`} onClick={() => deleteProduct(elem.id)} />
                  </h2>
                </div>
              );
            })
          }
        </div>
      </div>

      <div className={`${style.CartDetail} flex flex-col items-center gap-4`}>
        <h1 className={`${style.CartHeading} mt-8`}>Cart Totals</h1>
        <div className='flex gap-6 my-8'>
          <div className='flex flex-col gap-6'>
            <p className={`${style.Subtotal}`}>Subtotal</p>
            <p className={`${style.Total}`}>Total</p>
          </div>

          <div className='flex flex-col gap-6 text-right'>
            <p className={`${style.SubtotalPrice}`}>{total}</p>
            <p className={`${style.TotalPrice}`}>$ {total}</p>
          </div>
        </div>

        <button className={`${style.btn} mt-8`} onClick={detailsProduct}>
          <Link href="/checkout">Check Out</Link>
        </button>
      </div>
    </div>
  );
}

export default Cart;
