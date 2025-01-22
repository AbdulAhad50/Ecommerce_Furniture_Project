"use client"
import { client } from '@/sanity/lib/client'
import Card from '../Cards/Card'
import style from './shopingcard.module.css'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { StoreData } from '@/app/store/StoreContext'


interface T{
  _id:string,
  name:string,
  price:number,
  description:string,
  discountPercentage:number
}



const ShopingCard = () => {
  const [product, setProduct] = useState<T[]>([])
  const [arrayMethod, setArrayMethod] = useState<T[]>([]);
  const [searching, setSeraching] = useState("")
  let {search} = useContext(StoreData);

  useEffect(() => {
    async function fetchData() {

      if(search){
          const products = await client.fetch('*[_type == "product"]')

          let data = products.filter((elem:T)=> elem.name.toLowerCase() == search.toLowerCase());
          console.log("::::::",data[0]);
          setProduct([data[0]])

      }
      else{
        const products = await client.fetch('*[_type == "product"]')
        setProduct(products)
      } 

      
    }

    console.log("...",arrayMethod)

    fetchData()
  }, [search])

  useEffect(() => {
   
    if(product.length > 1){
      setArrayMethod(product.slice(0, 12))
    }else{
      setArrayMethod(product)
    }
  }, [product])



  return (
    <div className='flex flex-col items-center mt-10 mb-5 max-w-[1440px]'>
      <h1 className={`${style.productHeading} pb-6`}>Our Products</h1>

      <div className={`grid grid-cols-3 gap-8 justify-center mx-auto ${style.smallSizeScreen}`}>
        {arrayMethod.length > 0 ? (
          arrayMethod.map((product:T) => {
            console.log(`ProductImages/images/${product?._id}`)
            return (
            <Card key={product?._id} id={product?._id} price={product?.price} discountPercentage={0} image={`ProductImages/images/${product?._id}`} description={product?.description} name={product?.name} bgDisc='blue' />
          )
})
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
