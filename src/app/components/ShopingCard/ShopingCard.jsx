"use client"
import { client } from '@/sanity/lib/client'
import Card from '../Cards/Card'
import style from './shopingcard.module.css'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { StoreData } from '@/app/store/StoreContext'





const ShopingCard = () => {
  const [product, setProduct] = useState([])
  const [arrayMethod, setArrayMethod] = useState([]);
  const [searching, setSeraching] = useState("")
  let {search} = useContext(StoreData);

  useEffect(() => {
    async function fetchData() {

      if(search){
          const products = await client.fetch('*[_type == "product"]')
          console.log("searching, ",products)

          let data = products.filter((elem)=> elem.name.toLowerCase() == search.toLowerCase());
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
      console.log("Lenght")
    }else{
      console.log(">L>L")
      setArrayMethod(product)
    }
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
