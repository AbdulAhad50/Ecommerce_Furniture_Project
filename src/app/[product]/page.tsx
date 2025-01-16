"use client";
import BreadCrumbs from "./BreadCrumbs";
import View from "./View";
import Description from "./Description";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import React from "react";

// Define the types for your product data
interface T {
  _id: string;
  name: string;
  rating: number;
  description: string;
  price: number;
}

// Page component that automatically gets `params` injected by Next.js for dynamic routes
const Page = ({ params }: { params}) => {
  const [product, setProduct] = useState<T[]>([]);
  

  console.log("/***/",params)
  const id = params?.product

  useEffect(() => {
    async function FetchData() {
      try {
        console.log("id",id);

        const singleData = await client.fetch(`*[_type == 'product']`);

        const singleproduct = singleData.filter(
          (elem: T) => elem._id === id
        );
        console.log("....", singleproduct[0]?.name);
        setProduct(singleproduct);
      } catch (err) {
        console.log(err);
      }
    }

    FetchData();
  }, [params.product]);

  return (
    <div className="max-w-[1440px] mx-auto">
      <BreadCrumbs name={"Asgad S"} />

      {product.map((product: T) => {
        return (
          <View
            key={product._id}
            id={product._id}
            productName={product.name}
            productPrice={product.price}
            ProductDescription={product.description}
            rating={product.rating}
            image={{
              asset: {
                _ref: "",
                _type: "",
              },
              _type: "",
            }}
          />
        );
      })}

      {product.map((product: T) => {
        return (
          <Description
            key={product._id}
            descriptionData={product.description}
            reviewData={[""]}
            AdditionalInformationData={""}
          />
        );
      })}
    </div>
  );
};

export default Page;
