"use client"
import HeroBanner from '../HeroBanner/HeroBanner'
import Filter from './Filter'
import Card from '../components/Cards/Card'
import style from './shop.module.css'
import Achievement from '../components/achievement/Achievement'
import React, { useState, useEffect, useContext } from 'react'
import { client } from '@/sanity/lib/client'
import { StoreData } from '../store/StoreContext'


interface T {
  name:string,
  _id:string,
  description:string,
  price:number,
  discountPercentage:string
}



const Page = () => {

  const [productData, setProduct] = useState([])
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); 
  const [productsPerPage] = useState(12); 
  let { filter } = useContext(StoreData);

  useEffect(() => {
    async function FetchData() {
      setLoading(true);
      try {
        let products;
        
        if (filter) {
          products = await client.fetch('*[_type == "product"]');
          let filterDataFind = products.filter((elem:T) => elem.price >= filter);
          setProduct(filterDataFind);
        } else {
          products = await client.fetch('*[_type == "product"]');
          console.log("*()",products)
          setProduct(products);
        }
      } catch (err) {
        console.log("Err", err);
      } finally {
        setLoading(false);
      }
    }

    FetchData();
  }, [filter]);

  const pageCount = Math.ceil(productData.length / productsPerPage);

  const currentProducts = productData.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  // Handle next and previous page navigation
  const nextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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
            {currentProducts.length > 0 ? (
              currentProducts.map((product:T) => (
                <Card key={product._id} id={product._id} price={product.price} discountPercentage={0} image={`ProductImages/images/${product?._id}`} description={product.description} name={product.name} bgDisc='blue' />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

          <div className="flex justify-center  gap-10 mt-6">
            
            <button 
              onClick={previousPage} 
              disabled={currentPage === 0} 
              className="px-4 py-2 bg-[#B88E2F] text-white rounded disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="flex items-center justify-center text-lg">
              Page {currentPage + 1} of {pageCount}
            </span>
            <button 
              onClick={nextPage} 
              disabled={currentPage === pageCount - 1} 
              className="px-4 py-2 bg-[#B88E2F] text-white rounded disabled:bg-gray-400"
            >
              Next
            </button>
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
