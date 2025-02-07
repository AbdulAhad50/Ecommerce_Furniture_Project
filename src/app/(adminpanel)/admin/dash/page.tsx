"use client"
import axios from "axios"
import Card from "./Card/Card"
import Tables from "./Table"
import { useEffect, useState } from "react"

const Admin = () => {

  let [amount, setAmount] = useState<any[]>([]);
  let [allUser, setAllUser] = useState([])

  useEffect(()=>{
    async function getUser(){
        try{
            let res = await fetch("https://ecommerce-furniture-project.vercel.app/api/user");
            let result = await res.json();
            setAllUser(result)
        }catch(err){
          console.log(err);
        }
    }

    getUser()
  },[])

  useEffect(()=>{
     async  function GETPAYMENTLIST(){
        try{


          let result:any = await axios.get('/api/order/allorder')
          console.log('result', result)
          // let res:any = await axios.get('/api/paymentList')
          setAmount(result.data);
        }catch(err){
            console.log(err)
        }   
     }

     GETPAYMENTLIST();
    },[])
    

    let totalAmount = 0;

    amount.map((elem)=>{
      totalAmount += elem.totalOrderPrice
    })


    console.log("amount",amount)


  return (
    <div className="bg-slate-100 max-w-[1440px] mx-auto h-100% pb-20">
        <div className="flex gap-3 justify-center pt-10 flex-wrap">
              <Card data={`$${totalAmount}`} name={"Total Sale"}/>
              <Card data={amount.length} name={"Total Order"}/>
              <Card data={allUser.length} name={"Total User"}/>
        </div>

        <div>
            <Tables/>
        </div>
    </div>
  )
}

export default Admin


