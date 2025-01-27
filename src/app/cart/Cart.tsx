"use client";

import Link from 'next/link';
import styles from './cart.module.css'; // Import the CSS module
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
    const totalQuantity: number[] = [];
    const totalName: string[] = [];
    const singleProductPrice: number[] = [];

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
    <div className={`flex gap-10 ${styles.smallScreenSizeMain}`}>
      <div className={`flex flex-col gap-6 ${styles.smallSizeScreenHeader}`}>
        <div className={`flex justify-between items-center px-[20px] ${styles.cartHeader}`}>
          <h2 className={styles.cartHeaderFontStyle}>Product</h2>
          <h2 className={styles.cartHeaderFontStyle}>Price</h2>
          <h2 className={styles.cartHeaderFontStyle}>Quantity</h2>
          <h2 className={styles.cartHeaderFontStyle}>Subtotal</h2>
        </div>
        <div className="flex flex-col">
          {data.map((elem, i) => (
            <div className={`flex justify-between items-center mt-4 ${styles.cartHeaderPrice}`} key={i}>
              <div className={`w-[110px] flex flex-col gap-4 h-[110px] rounded-[10px] ${styles.brandImage}`}>
                <Image 
                  src={`/ProductImages/images/${elem.id}.jpg`} 
                  alt={elem.name} 
                  width={108} 
                  height={108} 
                  className="w-full h-full rounded-[10px]" 
                />
              </div>

              <h2 className={styles.realCartPrice}>Rs.{elem?.price}</h2>

              <div className="flex">
                <button onClick={() => DecreaseQuanity(elem.id)} className="mr-5">-</button>
                <h2 className={styles.Quantity}>{elem.quantity}</h2>
                <button className="ml-5" onClick={() => upDateQuantity(elem.id)}>+</button>
              </div>

              <h2 className={`ml-5 ${styles.realCartPrice} flex items-center gap-4`}>
                {elem.quantity * elem?.price}
                <AiFillDelete className={styles.Delete} onClick={() => deleteProduct(elem.id)} />
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.CartDetail} flex flex-col items-center gap-4`}>
        <h1 className={styles.CartHeading}>Cart Totals</h1>
        <div className="flex gap-6 my-8">
          <div className="flex flex-col gap-6">
            <p className={styles.Subtotal}>Subtotal</p>
            <p className={styles.Total}>Total</p>
          </div>

          <div className="flex flex-col gap-6 text-right">
            <p className={styles.SubtotalPrice}>{total}</p>
            <p className={styles.TotalPrice}>$ {total}</p>
          </div>
        </div>

        <button className={styles.btn} onClick={detailsProduct}>
          <Link href="/checkout">Check Out</Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
