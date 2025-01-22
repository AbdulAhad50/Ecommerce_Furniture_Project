import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import style from './comparison.module.css';
// import ProductCompare from './ProductCompare';

interface T {
  name: string;
  _id: string;
  description: string;
  price: number;
  image: any;
  rating: number;
  reviewCount: number;
}

const Compare = ({
  name,
  _id,
  description,
  price,
  image,
  rating,
  reviewCount,
}: T) => {
  return (
    <div className="flex justify-between gap-10">
      {/* Pass dynamic data to ProductCompare */}
      {/* <ProductCompare/> */}

      <div className="flex flex-col gap-4">
        <div className="">
          {/* Use dynamic image */}
          <Image
            src={image ? image : `/ProductImages/images/${_id}.jpg`}
            alt={name}
            width={200}
            height={200}
            className="w-full h-full"
          />
        </div>
        <h3 className={`${style.name}`}>
          {name}
        </h3>
        <h4 className={`${style.price}`}>Rs. {price.toLocaleString()}</h4>
        <div className="flex items-center gap-4">
          <span className={`${style.reviewCount}`}>{reviewCount}</span>
          <Rating value={rating} readOnly />
        </div>

        <div className='max-w-[200px]'>
          {description}
        </div>

        <button className={`${style.BtnCard}`}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Compare;
