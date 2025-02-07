import Link from "next/link";
import AllProduct from "./AllProduct"
import { IoIosAddCircle } from "react-icons/io";


const page = () => {
  return (
    <div className='max-w-[1440px] mx-auto h-auto bg-slate-100'>
        <div className="w-full flex justify-center pt-9 pb-8">
            <h1 className="text-4xl font-bold">Products</h1>
        </div>

        <div className="w-[80%] px-[20px]  my-3 bg-white h-[50px] items-center flex justify-between mx-auto">
            <h1>Add Product</h1>

            <button className="flex items-center gap-2 ">
              <Link href="/admin/products/Add-products" className="flex items-center gap-2">
                <IoIosAddCircle/>
                Add
              </Link>
            </button>
        </div>

        <AllProduct/>
    </div>

  )
}

export default page


// mera eik nextjs ka project hai jo k ecommerce website hai or uski jo product hai wo sanity sai atai hai meinay apni website k liye eik admin panel banaya hai jis mein mein chata wahan eik product add or delete karnay ka option hai mein chata hon jab mein apna admin panel sai product add karon tou wo sanity mein bhi chali jaye or delete karon tou sanity sai bhi delete ho jaye wo mein kis tarike sai karon