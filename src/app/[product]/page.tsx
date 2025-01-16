"use client";

import BreadCrumbs from "./BreadCrumbs";
import View from "./View";
import Description from "./Description";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

// Define the Params type for the dynamic route
interface Params {
  product: string;
}

// Define the type for the product data
interface T {
  _id: string;
  name: string;
  rating: number;
  description: string;
  price: number;
}

const Page = ({ params }: { params: { product: string } }) => {
  const [product, setProduct] = useState<T | null>(null); // Change state to hold a single product

  useEffect(() => {
    async function FetchData() {
      try {
        const id = params.product; // Extract the product ID from params
        console.log("Product ID:", id);

        // Fetch all products from the sanity client
        const singleData = await client.fetch(`*[_type == 'product']`);

        // Find the product by matching the id
        const singleProduct = singleData.find((elem: T) => elem._id === id);

        if (singleProduct) {
          console.log("Product Found:", singleProduct.name);
          setProduct(singleProduct); // Set the fetched product data to state
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    FetchData();
  }, [params.product]); // Trigger re-fetch whenever `params.product` changes

  if (!product) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Rendering breadcrumbs */}
      <BreadCrumbs name={product.name} />

      {/* Render product details */}
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

      {/* Render product description */}
      <Description
        key={product._id}
        descriptionData={product.description}
        reviewData={[""]} // Placeholder for review data
        AdditionalInformationData={""} // Placeholder for additional information
      />
    </div>
  );
};

export default Page;
