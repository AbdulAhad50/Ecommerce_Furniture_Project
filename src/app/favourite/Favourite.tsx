"use client";
import { useContext } from "react";
import { StoreData } from "../store/StoreContext";
import style from "./Favourite.module.css";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";

const Favourite = () => {
  const { favouriteProductItem, deleteFavouriteProduct } = useContext(StoreData);
  console.log("",favouriteProductItem);

  function deleteItem(id:string){
    deleteFavouriteProduct(id)
  }


  return (
    <div className={`flex flex-col max-w-[1440px] mx-auto`}>
      <h1 className={`${style.Heading} my-10`}>Favourite Product</h1>

      <div className={`flex flex-col gap-4`}>

        { 
        favouriteProductItem.length > 0 ? 
        
        favouriteProductItem.map((elem)=>{
          return (
            <div
            className={`relative flex justify-between items-center gap-4 w-[70vw] h-[100px]  ml-8 ${style.border}`}
            key={elem.id}
          >
            <span
              className={`position-absolute absolute -top-3 -right-2 start-100 translate-middle badge rounded-pill bg-red z-10 ${style.bedge}`}
            >
              <TiDelete onClick={()=>deleteItem(elem.id)}/>
            </span>
  
            <div className="w-[80px] h-[100px] ml-4">
              <Image
                src={`/ProductImages/images/${elem.id}.jpg`}
                alt={""}
                width={80}
                height={100}
                className="w-full h-full"
              />
            </div>
  
            <div className="text-white flex flex-col gap-0">
              <h2 className={`${style.HeadingsNames}`}>Name</h2>
              <h3 className={`${style.Name}`}>{elem.name}</h3>
            </div>
  
            <div className="text-white flex flex-col gap-0">
              <h2 className={`${style.HeadingsNames}`}>Price</h2>
              <h3 className={`${style.Price}`}>${elem.price}</h3>
            </div>
  
            <div className="mr-8">

              <Link href={`/${elem.id}`}>
                  <button className={`${style.btn}`}>view</button>
              </Link>
            </div>
          </div>
          )
        })
        
        

        : "No Favourite Product Here"
      }
        
       
      </div>
    </div>
  );
};

export default Favourite;
