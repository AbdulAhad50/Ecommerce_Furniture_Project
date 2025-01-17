"use client";

import BreadCrumbs from "./BreadCrumbs";
import View from "./View";
import Description from "./Description";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

// Define the type for the product data
interface T {
  _id: string;
  name: string;
  rating: number;
  description: string;
  price: number;
}

interface PageProps {
  params: { product: string };
}

const Page = ({ params }: {params:{ product: string } | [] | PageProps | {} | string[] | number[]} ) => {
  const [product, setProduct] = useState<T | null>(null); // Product state for storing fetched data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  

  useEffect(() => {
    async function FetchData() {
      try {
        const productId =  params;
        const {product} =  productId
         // Dynamic product ID from the route
        console.log("Fetching product with ID:", product);

        // Fetch product by ID from Sanity
        const query = `*[_type == 'product' && _id == $id][0]`; // Fetch only the product matching the ID
        const singleProduct: T = await client.fetch(query, { id: product });

        if (singleProduct) {
          console.log("Product Found:", singleProduct);
          setProduct(singleProduct);
        } else {
          console.warn("No product found with this ID:", productId);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); // End loading state
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
