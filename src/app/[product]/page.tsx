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

// Interface for page props
interface PageProps {
  params: { product: string };
}

// Define the structure for the custom result object inside the fulfilled promise
interface ProductData {
  product: string;
}

// Define the custom proxy handler type
interface ProxyPromiseHandler {
  get(target: any, prop: string | symbol, receiver: any): any;
  ownKeys(target: any): string[];
  set(target: any, prop: string | symbol, value: any, receiver: any): boolean;
}

// Define the proxy type extending the Promise interface
interface ProxyPromise<T> extends Promise<T> {
  // Custom properties on the Proxy (like `product`)
  product?: string;
  [[PromiseState]]?: 'fulfilled' | 'pending' | 'rejected';  // 
  [[PromiseResult]]?: T; 
  [[IsRevoked]]?: boolean;   
}

// Updated type for the PageProps
type MyProxyPromise = ProxyPromise<T>; // Changed to use the correct type T here

const Page = ({ params }: {params: PageProps | MyProxyPromise}) => {
  const [product, setProduct] = useState<T | null>(null); // Product state for storing fetched data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  console.log(params);

  useEffect(() => {
    async function FetchData() {
      try {
        const { product } = params; // Extract product ID from params
        console.log("Fetching product with ID:", product);

        // Fetch product by ID from Sanity
        const query = `*[_type == 'product' && _id == $id][0]`; // Fetch only the product matching the ID
        const singleProduct: T = await client.fetch(query, { id: product });

        if (singleProduct) {
          console.log("Product Found:", singleProduct);
          setProduct(singleProduct);
        } else {
          console.warn("No product found with this ID:", product);
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
