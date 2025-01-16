"use client"
import HeroBanner from '../HeroBanner/HeroBanner'
import Filter from './Filter'
import Card from '../components/Cards/Card'
import style from './shop.module.css'
import Achievement from '../components/achievement/Achievement'
import React, {useState } from 'react'
import { client } from '@/sanity/lib/client'


interface T{
  _id:string;
  price:number;
  image:{asset: {
    _ref: string,
    _type: string
  },
  _type:string},
  name:string;
  description:string
}

const page = () => {

  const [productData, setProduct] = useState<T[]>([])
  
    async function fetchData() {
      const products = await client.fetch('*[_type == "product"]')
      setProduct(products)
    }

    fetchData()
    

    
  return (
    <div className='max-w-[1440px] mx-auto'>
      <HeroBanner crumbs='Shop' pageName='Shop' />
      <Filter totalProduct={productData.length} />
      <div className={`flex flex-col flex-wrap mt-10`}>
        <div className={`grid grid-cols-3 gap-20 mx-auto justify-center ${style.smallScreenSizeCard}`}>
          {productData.length > 0 ? (

            productData.map((product) => (
              <Card key={product._id} id={product._id} price={product.price} discountPercentage={''} image={{
                asset: {
                  _ref: '',
                  _type: ''
                },
                _type: ''
              }} description={product.description} name={product.name} bgDisc='blue'/> // Passing the product data to Card component
            ))
          ) : (
            <p>Loading products...</p> // Display loading message while data is being fetched
          )}
        </div>
      </div>

      <div>
        <Achievement />
      </div>
    </div>
  )
}

export default page
