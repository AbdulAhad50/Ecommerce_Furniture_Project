"use client"
import HeroBanner from '../HeroBanner/HeroBanner'
import Filter from './Filter'
import Card from '../components/Cards/Card'
import style from './shop.module.css'
import Achievement from '../components/achievement/Achievement'
import React, { useState, useEffect, useContext } from 'react'
import { client } from '@/sanity/lib/client'
import { StoreData } from '../store/StoreContext'

const Page = () => {

  const [productData, setProduct] = useState([])
  const [loading, setLoading] = useState(true);  // Add loading state
  let { filter } = useContext(StoreData);

  useEffect(() => {
    async function FetchData() {
      setLoading(true);  // Start loading
      try {
        let products;
        
        if (filter) {
          console.log(".......>", filter)
          console.log(1)
          products = await client.fetch('*[_type == "product"]');
          
          let filterDataFind = products.filter((elem) => elem.price >= filter);
          setProduct(filterDataFind);
        } else {
          console.log("<.......>", filter)
          console.log(2)
          products = await client.fetch('*[_type == "product"]');
          console.log(products);
          setProduct(products);
        }
      } catch (err) {
        console.log("Err", err);
      } finally {
        setLoading(false)
      }
    }

    FetchData();
  }, [filter]);

  return (
    <div className='max-w-[1440px] mx-auto'>
      <HeroBanner crumbs='Shop' pageName='Shop' />
      <Filter totalProduct={productData.length} />
      
      {loading ? (
        <div className="flex justify-center mt-10">
          <p>Loading...</p>
        </div>
      ) : (
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
                }} description={product.description} name={product.name} bgDisc='blue' />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      )}

      <div>
        <Achievement />
      </div>
    </div>
  )
}

export default Page;
