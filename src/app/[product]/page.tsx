"use client"
import BreadCrumbs from "./BreadCrumbs"
import View from "./View"
import Description from "./Description"
import { client } from "@/sanity/lib/client"
import { useEffect, useState } from "react"
import React from "react"


const page =  ({params}:any) => {
  let [product,setProduct] = useState([])

  
  useEffect( ()=> {
    async function fetchData(){
      try{
        
        let id = await  params.product;
        console.log(id)

        let singleData = await client.fetch(`*[_type == 'product']`)
        let res = await singleData
        console.log(res)
    
        let singleproduct = await singleData.filter((elem:any)=> elem._id === id);
        console.log("....",singleproduct[0].name)
        setProduct(singleproduct)
        
        }catch(err){
          console.log(err)
      }
    }

    fetchData()
  }, [params.product])

  
  return (
    <div className="max-w-[1440px] mx-auto">
          
          <BreadCrumbs/>

          {
            product.map((product:any)=>{

              console.log("product.name")
                return (
                  <View key={product._id} id={product._id} productName={product.name} productPrice={product.price} ProductDescription={product.description} rating={product.rating} image={{
                    asset: {
                      _ref: "",
                      _type: ""
                    },
                    _type: ""
                  }}/>
                )
            })
          }

          {
            product.map((product:any)=>{
              return (

                <Description descriptionData={product.description} reviewData={[""]} AdditionalInformationData={""}/>
              )
            })
          }
    </div>
  )
}

export default page