"use client";

import BreadCrumbs from "./BreadCrumbs";
import View from "./View";
import Description from "./Description";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";


const Page = ({ params }:{params:{product:string}}) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true); 
  console.log(params);

  useEffect(() => {
    async function FetchData() {
      try {
        const { product } = params;
        console.log("Fetching product with ID:", product);

        const query = `*[_type == 'product' && _id == $id][0]`;
        const singleProduct= await client.fetch(query, { id: product });

        if (singleProduct) {
          console.log("Product Found:", singleProduct);
          setProduct(singleProduct);
        } else {
          console.warn("No product found with this ID:", product);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    }

    FetchData();
  }, [params?.product]); // Re-run when product ID changes

  if (loading) {
    return <div>Loading...</div>; // Display while fetching data
  }

  if (!product) {
    return <div>Product not found.</div>; // Handle if no product is found
  }

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Render breadcrumbs */}
      <BreadCrumbs name={product.name} />

      {/* Render product details */}
      <View
        key={product._id}
        id={product._id}
        productName={product.name}
        productPrice={product.price}
        ProductDescription={product.description}
        rating={product.rating}
        image={`ProductImages/images/${product._id}`}
      />

      {/* Render product description */}
      <Description
        key={product._id}
        descriptionData={product.description}
        AdditionalInformationData={""} // Placeholder for additional information
      />
    </div>
  );
};

export default Page;
