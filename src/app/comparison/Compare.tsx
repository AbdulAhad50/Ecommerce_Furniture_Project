import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import style from './comparison.module.css';

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
    <div className="flex flex-col sm:flex-row justify-between gap-10 sm:w-full">
      <div className="flex flex-col gap-4 w-full">
        {/* Product Image */}
        <div className="">
          <Image
            src={image ? image : `/ProductImages/images/${_id}.jpg`}
            alt={name}
            width={200}
            height={200}
            className="w-full h-full"
          />
        </div>

        {/* Product Name */}
        <h3 className={`${style.name} text-left`}>
          {name}
        </h3>

        {/* Product Price */}
        <h4 className={`${style.price} text-left`}>
          Rs. {price.toLocaleString()}
        </h4>

        {/* Rating and Review Count */}
        <div className="flex">
          <span className={`${style.reviewCount} text-left`}>{reviewCount}</span>
          <Rating value={rating} readOnly />
        </div>

        {/* Product Description */}
        <div className='text-left'>
          <p>{description}</p>
        </div>

        {/* Add to Cart Button */}
        <button className={`${style.BtnCard} mt-4`}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Compare;
