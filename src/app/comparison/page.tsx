"use client";
import React, { useContext, useState, useEffect } from 'react';
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
    const filterData = allProduct.filter((elem) => elem._id === selectedProduct);
    setCompare(filterData);
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <HeroBanner crumbs={"Comparison"} pageName={"Product Comparison"} />

      <div className="flex flex-col gap-[3vw] sm:flex-row justify-between mt-10 px-[20px]">
        <div className="sm:w-[200px] mb-6 sm:mb-0">
          <h1 className={`${style.Heading}`}>Go to Product page for more Products</h1>
          <Link href={'/shop'} className={`${style.viewMoreStyle}`}>View More</Link>
        </div>

        {/* Left side and Right side comparison layout */}
        <div className="flex flex-col sm:flex-row gap-10 sm:w-auto">
          {/* Left Product Compare */}
          <div className="flex flex-col w-full sm:w-1/2 gap-4">
            <ProductCompare />
          </div>

          {/* Right Product Details */}
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-1/2">
            {compareProduct.map((elem) => {
              return (
                <Compare
                  key={elem._id}
                  name={elem.name}
                  _id={elem._id}
                  description={elem.description}
                  price={elem.price}
                  image={undefined}  // As you have already set image dynamically in the compare
                  rating={elem.rating}
                  reviewCount={elem.reviewCount}
                />
              );
            })}
          </div>
        </div>

        {/* Product Selection and Compare Button */}
        <div className={`flex flex-col gap-3 w-full sm:w-auto ${style.ProductAdd}`}>
          <h2 className={`${style.Add}`}>Add a Product</h2>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className={`${style.select}`}
          >
            <option value="" disabled>Select a Product</option>
            {allProduct.map((elem: T) => (
              <option key={elem._id} value={elem._id}>{elem.name}</option>
            ))}
          </select>

          <button
            onClick={handleCompareClick}
            className={`${style.BtnStyle} w-[150px] sm:w-[200px] ${style.BtnStyle}`}
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
