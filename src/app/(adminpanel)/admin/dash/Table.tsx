"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

interface T{
  username:string,
  email:string
}


const Tables = () => {

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

  return (
    <div className="w-[80%] mx-auto bg-white mt-10">
        <Table className="w-[100%]">
          <TableCaption>A list of Total Users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUser?.map((elem:T)=><TableRow>
              <TableCell className="font-medium">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              </TableCell>
              <TableCell>{elem.username}</TableCell>
              <TableCell>{elem.email}</TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>

    </div>
  )
}

export default Tables