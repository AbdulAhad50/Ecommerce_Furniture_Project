"use client";
import Image from 'next/image';
import style from './comparison.module.css';
import { Rating } from '@mui/material';
import { StoreData } from '../store/StoreContext';
import { useContext, useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';

interface T {
  name: string;
  _id: string;
  description: string;
  price: number;
  image: any;
  rating: number;
  reviewCount: number;
}

const ProductCompare = () => {
  const { compare } = useContext(StoreData);  // Renamed `compare` to `compareList`
  const [compareProducts, setCompareProducts] = useState<T[]>([]);  // Renamed `Compare` to `compareProducts`

  useEffect(() => {
    async function FindList() {
      try {
        const findProduct = await client.fetch(`*[_type == 'product']`);
        console.log("Fetched Products:", findProduct);

        const filteredProducts = findProduct.filter((elem: T) => compare.includes(elem._id));
        setCompareProducts(filteredProducts);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    }

    if (compare.length > 0) {
      FindList();
    }
  }, [compare]);

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-8">
        {compareProducts.map((product: T) => {
          return (
            <div key={product._id} className="product-item flex flex-col gap-4">
              {/* Product Image */}
              <div className="product-image">
                <Image
                  src={product.image ? product.image : `/ProductImages/images/${product._id}.jpg`}  // Check image path
                  alt={product.name || 'Product Image'}
                  width={200}
                  height={200}
                  className='w-full h-full object-cover'  // Ensuring image stays in aspect ratio
                />
              </div>

              {/* Product Details */}
              <div className="product-details flex flex-col gap-4 text-left">
                <h3 className={`${style.name}`}>{product.name || 'Unknown Product'}</h3>
                <h4 className={`${style.price}`}>Rs. {product.price || '0.00'}</h4>

                <div className="flex items-center gap-4">
                  <span className={`${style.reviewCount}`}>{product.reviewCount || 0}</span>
                  <Rating value={product.rating || 0} readOnly />
                </div>

                <div className=''>
                  <p>{product.description}</p>
                </div>

                <button className={`${style.BtnCard}`}>Add To Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCompare;
