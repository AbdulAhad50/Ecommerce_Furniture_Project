"use client"
import { client } from '@/sanity/lib/client'
import Card from '../Cards/Card'
import style from './shopingcard.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'



const ShopingCard = () => {
  const [product, setProduct] = useState([])
  const [arrayMethod, setArrayMethod] = useState([])

  useEffect(() => {
    async function fetchData() {
      const products = await client.fetch('*[_type == "product"]')
      setProduct(products)
    }

    fetchData()
  }, [])

  useEffect(() => {
    // When the products are fetched, slice the first 12 items into arrayMethod
    setArrayMethod(product.slice(0, 12))
  }, [product])

  return (
    <div className='flex flex-col items-center mt-10 mb-5 max-w-[1440px]'>
      <h1 className={`${style.productHeading} pb-6`}>Our Products</h1>

      <div className={`grid grid-cols-3 gap-8 justify-center mx-auto ${style.smallSizeScreen}`}>
        {arrayMethod.length > 0 ? (
          arrayMethod.map((product) => (
            <Card key={product?._id} id={product?._id} price={product?.price} discountPercentage={''} image={{
              asset: {
                _ref: '',
                _type: ''
              },
              _type: ''
            }} description={product?.description} name={product?.name} bgDisc='blue' />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <div className='mt-6'>
        <button className={`${style.showBtn}`}><Link href={'/shop'}>Show More</Link></button>
      </div>
    </div>
  )
}

export default ShopingCard
