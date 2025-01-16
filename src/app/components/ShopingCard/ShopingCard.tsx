"use client"
import { client } from '@/sanity/lib/client'
import Card from '../Cards/Card'
import style from './shopingcard.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'


interface Product {
  name : string,
  _id:string,
  price:number,
  description:string
}



const ShopingCard = () => {

  const [product,setProduct] = useState([])

  useEffect(()=>{
    async function fetchData() {
      const products = await client.fetch('*[_type == "product"]')
      // console.log("...",products[1])
      setProduct(products)
    }
  
    fetchData()
  },[])


  const arrayMethod:Product[] = [];

  for (let i=0; i<12; i++){
    
    arrayMethod.push(product[i])
  }

  return (
    <div className='flex flex-col items-center mt-10 mb-5 max-w-[1440px]'>
      <h1 className={`${style.productHeading} pb-6`}>Our Products</h1>

      <div className={`grid grid-cols-3 gap-8 justify-center mx-auto ${style.smallSizeScreen}`}>
        
          {arrayMethod.length > 0 ? (

          arrayMethod.map((product: Product) => (
              <Card key={product?._id} id={product?._id} price={product?.price} discountPercentage={''} image={{
                asset: {
                  _ref: '',
                  _type: ''
                },
                _type: ''
              }} description={product?.description} name={product?.name} bgDisc='blue'/> // Passing the product data to Card component
            ))
          ) : (
            <p>Loading products...</p> // Display loading message while data is being fetched
          )}
      </div>

      <div className='mt-6'>
        <button className={`${style.showBtn}`}><Link href={'/shop'}>Show More</Link></button>
      </div>
    </div>
  )
}

export default ShopingCard
