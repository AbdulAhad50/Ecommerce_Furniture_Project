"use client";
import React, { useContext, useEffect, useState } from 'react';
import HeroBanner from '../HeroBanner/HeroBanner';
import style from './comparison.module.css';
import Compare from './Compare';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { StoreData } from '../store/StoreContext';
import ProductCompare from './ProductCompare';

interface T {
    name: string;
    _id: string;
    description: string;
    price: number;
    image: any;
    rating: number;
    reviewCount: number;
}

const Page = () => {
  const { compare } = useContext(StoreData);  
  const [allProduct, setAllProduct] = useState<T[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [compareProduct, setCompare] = useState<T[]>([]);



  useEffect(() => {
    async function FindList() {
      try {
        const findProduct = await client.fetch(`*[_type == 'product']`);
        setAllProduct(findProduct);
      } catch (err) {
        console.log("err", err);
      }
    }

    FindList();
  }, []);


  const handleCompareClick = () => {
    // console.log("***", selectedProduct);
  
    // Filter data based on selected product ID
    const filterData = allProduct.filter((elem) => elem._id === selectedProduct);

    setCompare(filterData);

  };

  console.log("......",compareProduct);

  return (
    <div className="max-w-[1440px]">
      <HeroBanner crumbs={"Comparison"} pageName={"Product Comparison"} />

      <div className="flex justify-between mt-10 px-[20px]">
        <div className="w-[200px]">
          <h1 className={`${style.Heading}`}>Go to Product page for more Products</h1>
          <Link href={'/shop'} className={`${style.viewMoreStyle}`}>View More</Link>
        </div>

        <div className='flex justify-between gap-10'>

            <div>
                <ProductCompare/>
            </div>
            <div>
            {
                compareProduct.map((elem)=>{
                    return(
                        <Compare name={elem.name} _id={elem._id} description={elem.description} price={elem.price} image={undefined} rating={elem.rating} reviewCount={elem.reviewCount} />
                    )
                })
            }
         </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className={`${style.Add}`}>Add a Product</h2>
          <select
            value={selectedProduct}  // Bind the selected product ID to the state
            onChange={(e) => setSelectedProduct(e.target.value)}  // Update state when a new product is selected
            className={`${style.select}`}
          >
            <option value="" disabled>Select a Product</option>
            {allProduct.map((elem: T) => (
              <option key={elem._id} value={elem._id}>{elem.name}</option>
            ))}
          </select>

          <button
            onClick={handleCompareClick}  // Trigger the compare action on button click
            className={`${style.BtnStyle} w-[150px]`}
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
