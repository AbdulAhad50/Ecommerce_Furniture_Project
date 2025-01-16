"use client"
import BreadCrumbs from "./BreadCrumbs"
import View from "./View"
import Description from "./Description"
import { client } from "@/sanity/lib/client"
import { useEffect, useState } from "react"
import React from "react"


interface Params {
  product: string;
}

interface T{
  _id:string,
  name:string,
  rating:number,
  description:string,
  price:number 

}

const page =  ({ params }: { params: Params }) => {
  const [product,setProduct] = useState([])

  
  useEffect( ()=> {
    async function FetchData(){
      try{
        
        const id = await  params.product;
        console.log(id)

        const singleData = await client.fetch(`*[_type == 'product']`)

        const res = await singleData
        console.log(res)
    
        const singleproduct = await singleData.filter((elem)=> elem._id === id);
        console.log("....",singleproduct[0].name)
        setProduct(singleproduct)
        
        }catch(err){
          console.log(err)
      }
    }

    FetchData()
  }, [params.product])

  
  return (
    <div className="max-w-[1440px] mx-auto">
          
          <BreadCrumbs/>

          {
            product.map((product:T)=>{

              console.log("product.name")
                return (
                  <View key={product?._id} id={product?._id} productName={product?.name} productPrice={product?.price} ProductDescription={product.description} rating={product?.rating} image={{
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
            product.map((product:T)=>{
              return (

                <Description key={product._id} descriptionData={product.description} reviewData={[""]} AdditionalInformationData={""}/>
              )
            })
          }
    </div>
  )
}

export default page