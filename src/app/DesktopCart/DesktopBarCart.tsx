import { useContext, useEffect, useState, useRef } from "react";
import { StoreData } from "../store/StoreContext";
import { TiDelete } from "react-icons/ti";
import Image from "next/image";
import Link from "next/link";
import { BsBagX } from "react-icons/bs";
import style from './carts.module.css';
import { toast } from "react-toastify";

const Cart = () => {
  const [dataFind, setDataFind] = useState<string[]>([]);
  const { data, deleteProduct } = useContext(StoreData);

  const nameArray: string[] = [];
  const totalPriceDataRef = useRef(0);

  useEffect(() => {
    totalPriceDataRef.current = 0;

    for (let i = 0; i < data.length; i++) {
      nameArray.push(data[i]?.name);
      totalPriceDataRef.current += data[i]?.price;
    }

    if (data?.length > 0) {
      const truncateLongWords = (arr: string[]) => {
        return arr.map((word) => {
          if (word.length > 10) {
            return word.slice(0, 14) + "..."; // Truncate long words
          }
          return word;
        });
      };

      const dataFetchName = truncateLongWords(nameArray);
      setDataFind(dataFetchName);
    }
  }, [data, nameArray, dataFind]);

  return (
    <div
      className={`relative w-full md:w-[350px] flex flex-col items-center mt-8 ${data?.length > 2 ? "h-[550px]" : "h-[500px]"} bg-white pr-[40px]`}
    >
      <div className={`w-[350px] flex justify-between items-center gap-5 mb-4 ${style.cartTopBorder}`}>
        <h1 className={`${style.cartTopHeading}`}>Shopping Cart</h1>
        <BsBagX className="text-[#9F9F9F]" />
      </div>

      {/* Product list section, scrollable */}
      <div className={`w-[350px] flex flex-col items-center gap-5 mt-3 ${style.cartContainer}`}>
        <div className={`${style.scrollableCartItems}`}>
          {dataFind.map((elem, i) => (
            <div className="flex gap-5 mb-4" key={data[i]?.id}>
              <div className={`${style.imageContainer}`}>
                <Image
                  src={`/ProductImages/images/${data[i]?.id}.jpg`}
                  alt={""}
                  width={100} // Set a fixed width for all images
                  height={100} // Set a fixed height for all images
                  className="w-full h-full rounded-[10px]"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h5 className={`${style.cartProductName}`}>{elem}</h5>
                <div>
                  <span className={`${style.cartProductQuantityStyle}`}>1 &nbsp; x &nbsp;</span>
                  <span className={`${style.cartProductPriceStyle}`}>${data[i]?.price}</span>
                </div>
              </div>

              <TiDelete
                className="text-[#9F9F9F] cursor-pointer text-[30px]"
                onClick={() => {
                  deleteProduct(data[i]?.id);
                  toast.error("Delete Cart Product")
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom section (Subtotal + Cart Button) */}
      <div className={`w-[350px] bg-white ${style.cartBottom}`}>
        <div className={`w-[350px] justify-between flex items-center gap-5`}>
          <h2 className={`${style.cartBottomSubTotal}`}>Subtotal</h2>
          <p className={`${style.cartBottomSubTotalPrice}`}>$ {totalPriceDataRef.current}</p>
        </div>

        <div className={`w-[350px] justify-center flex items-center gap-5 ${style.cartBottomButtons}`}>
          <button className={`${style.cartBottomBtn}`}><Link href={"/cart"}>Cart</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
