"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaRegEdit } from "react-icons/fa";
import { client } from "@/sanity/lib/client"
import { adminDelete } from "@/services/admin"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Link from "next/link";

interface Product {
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  description: string;
  price: number;
  priceWithoutDiscount: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  sizes: string[];
  tags: string[];
}





const AllProduct = () => {

  const handleDeleteProduct = async (productId:string) => {
    
    try {
      let data = {
        _id:productId
      }
      let res = await axios.post('/api/product',data);
      console.log(res)
      toast.success('Deleted')
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  async function handleUpdateProduct(){

  }



  let [AllProducts, setAllProduct] = useState([])

  useEffect(()=>{
    async function FetchProduct(){
      try {
        let res = await client.fetch('*[_type == "product"]');
        console.log(res)
        setAllProduct(res)
      } catch (error) {
        console.log(error)
      }
  }

  FetchProduct();
  },[])



  return (
    <div className="max-w-[1440px]">
        <Table className="w-[80%] bg-white mx-auto">
            <TableCaption>A list of All Products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Active</TableHead>
                <TableHead className="text-right">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AllProducts.map((elem:Product)=><TableRow>

                <TableCell className="">
                    <Image src={`/ProductImages/images/${elem._id}.jpg`} alt="" width={40} height={40}/>
                </TableCell>
                <TableCell>{elem.name}</TableCell>
                <TableCell>{elem.price}</TableCell>
                <TableCell className="text-right">
                      <button className="" key={elem._id} onClick={()=>handleDeleteProduct(elem._id)}>Delete</button>
                </TableCell>

                <TableCell className="text-right">
                      <Link href={`/admin/products/UpdateProduct/${elem._id}`}><button className="text-[18px]" key={elem._id}><FaRegEdit/></button></Link>
                </TableCell>
              </TableRow>)}
            </TableBody>
          </Table>
    </div>
  )
}

export default AllProduct