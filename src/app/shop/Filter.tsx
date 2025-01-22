"use client"

import Image from "next/image"
import style from './shop.module.css'
import { useState,useContext } from "react"
import { StoreData } from "../store/StoreContext"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"


const Filter = ({totalProduct}:{totalProduct:number}) => {


    const [selectedValue, setSelectedValue] = useState("");

    const handleSelectChange = (event:{target:{value:string}}) => {
      setSelectedValue(event.target?.value);
    };


  let [search, setSearch] = useState("")
  const { data,FilterData } = useContext(StoreData);

  function Searching(){
    // console.log(selectedValue)
    FilterData(selectedValue)
  }


  return (
    <div className={`max-w-[1440px] mx-[auto] ${style.filter}`}>

        <div className={`flex w-full  items-center justify-around ${style.smallScreenSize}`}>
                <div className={`flex items-center gap-[3vw] ${style.smallSize}`}>

                <Popover>

                    <PopoverTrigger>
                            <Image src="/Filter/bar.svg" alt='filter' width={19.05} height={16.67} className="cursor-pointer"/>
                    </PopoverTrigger>
                    <PopoverContent>
                            <select name="" id="" onChange={handleSelectChange} value={selectedValue}>
                                <option value="" disabled selected>Filter By Price</option>
                                <option value="100">Rs. 100</option>
                                <option value="200">Rs. 200 - 300</option>
                                <option value="500">Rs. 500 - 999</option>
                                <option value="1000">Rs. 1000 - 1999</option>
                                <option value="2000">Rs. 2000 - 5000</option>
                            </select>

                            <button onClick={Searching} className={`${style.SearchBtn}`}>Search</button>
                    </PopoverContent>

                </Popover>


                    
                    <span className={`${style.filterHeading}`}>Filter</span>
                    <Image src="/Filter/bar2.svg" alt='bar' width={19.05} height={16.67}/>
                    <Image src="/Filter/bar3.svg" alt='bar2' width={19.05} height={16.67}/>

                    <div className={``}>
                            <h1 className={`${style.showing}`}>Showing 1-{totalProduct} of {totalProduct} result</h1>
                    </div>  
                </div>

                <div className={`flex gap-[3vw] ${style.smallSize}`}>
                    <div className={`flex items-center gap-4 ${style.smallSize}`}>
                        <span className={`${style.showingData}`}>
                            Show
                        </span>

                        <span className={`w-[48px] h-[48px] bg-white flex items-center justify-center ${style.showNumber}`} >
                            {totalProduct}
                        </span>
                    </div>

                    <div className={`flex gap-[3vw] items-center`}>
                        <span className={`${style.showingData}`}>
                            Short by
                        </span>

                        <span className={`w-[100px] h-[48px] bg-white flex items-center justify-center ${style.showNumber}`}>
                            Default
                        </span>
                    </div>
                </div>
        </div>

    </div>
  )
}

export default Filter