"use client";

import BreadCrumbs from "./BreadCrumbs";
import View from "./View";
import Description from "./Description";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

interface RusticVaseSet {
  name: string;
  price: number; 
  priceWithoutDiscount: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  description: string;
  keyFeatures: string[]; 
  sizes: string[];
  tags: string[];
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}



const Page = ({ params }: {params:{product:string}}) => {
  const [product, setProduct] = useState<RusticVaseSet[]>([]); //
  // const [loading, setLoading] = useState<boolean>(true); // 

  console.log("'''''",params);

  useEffect(() => {
    async function FetchData() {
      try {
        const data = params;
        console.log("Fetching product with ID:", data?.product);

        const query = await client.fetch( `*[_type == 'product']`); 
        let findData = query.filter((elem:any)=> elem._id == data?.product)
        setProduct(findData);
        console.log("//",findData)
       
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        
      }
    }

    

    FetchData();
  }, [params?.product]);

 
console.log("...",product)
  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Render breadcrumbs */}
      <BreadCrumbs name={product[0]?.name} />

      {/* Render product details */}
       <View
        key={product[0]?._id}
        id={product[0]?._id}
        productName={product[0]?.name}
        productPrice={product[0]?.price}
        ProductDescription={product[0]?.description}
        rating={product[0]?.rating}
        image={{
          asset: {
            _ref: "",
            _type: "",
          },
          _type: "",
        }}
      />

      {/* Render product description */}
       <Description
        key={product[0]?._id}
        descriptionData={product[0]?.description}
        reviewData={[""]} // Placeholder for review data
        AdditionalInformationData={""} // Placeholder for additional information
      />
    </div>
  );
};

export default Page;
