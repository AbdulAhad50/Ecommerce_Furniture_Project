"use client"
import { StoreData } from '@/app/store/StoreContext';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useContext, useEffect, useState } from 'react'

const page = () => {

  let { GetUser, user } = useContext(StoreData);
  let [userOrder, setUserOrder] = useState([]);
  let [isLoading, setIsLoading] = useState(true);  // Add loading state

  useEffect(() => {
    GetUser();
  }, []);

  useEffect(() => {

    async function GETDATA() {
      try {
        if (user) {
          setIsLoading(true);  // Start loading
          let res = await axios.post("/api/order/allorder", user);
          console.log("use id", res);
          setUserOrder(res.data);
          setIsLoading(false);  // Stop loading
        }
      } catch (er) {
        console.log(er);
        setIsLoading(false);  // Stop loading on error
      }
    }

    GETDATA();
  }, [user]);

  console.log(":::::::", userOrder);

  return (
    <div className='max-w-[1440px] flex flex-col items-center mx-auto py-10 bg-slate-100'>
      <h1 className='text-[32px]'>Order List</h1>

      {isLoading ? (
        <div className='flex justify-center items-center mt-20'>
          <div className="animate-spin border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full"></div>
        </div>
      ) : (
        userOrder.map((item: any) => (
          <div className='w-[80%] bg-white h-auto p-[20px] border border-black mt-5 rounded-[10px]' key={item.id}>
            <h1 className='text-[32px]'>User Detail</h1>
            <div> 
              <ul className='flex flex-col gap-2 pt-4'>
                <li>name: {item.user.username}</li>
                <li>Email: {item.user.email}</li>
                <li></li>
              </ul>
            </div>

            <div>
              <h1 className='text-[32px]'>Product Details</h1>
              <Table className="w-[100%] mt-5">
                <TableCaption>A list of Total Users.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>QTy</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Payment Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {item?.products?.map((product: any, index: number) => {
                    return product?.totalName?.map((name: string, idx: number) => (
                      <TableRow key={`${index}-${idx}`}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{product?.totalQuantity[idx]}</TableCell>
                        <TableCell>{product?.singleProductPrice[idx]}</TableCell>
                        <TableCell>{item.paymentMethod}</TableCell>
                      </TableRow>
                    ));
                  })}
                </TableBody>
              </Table>

            </div>

            <div className='w-[50%] rounded-sm mt-4 h-[40px] mx-auto flex justify-center items-center text-center text-white bg-black'>
              Total Amount : ${item.totalOrderPrice}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default page
