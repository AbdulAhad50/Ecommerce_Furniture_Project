import Image from "next/image";
import style from './furniture.module.css'


const GridComponent = () => {
  return (

<div className="flex flex-col items-center max-w-[1440px] mx-auto">

    <div className="my-10">
        <p className={`${style.furnitureS}`}>Share your setup with</p>
        <p className={`${style.furnitureP}`}>#FuniroFurniture</p>
    </div>

    <div className="grid grid-cols-12 gap-[10px] grid-rows-7  w-full h-screen">
      <div className="col-span-1 row-span-3 bg-red-200 relative">
        <Image src="/Furniture/home1.svg" alt="Div 1" fill className="object-cover" />
      </div>
      <div className="col-span-2 row-start-4 row-span-3 bg-blue-200 relative">
        <Image src="/home/home2.svg" alt="Div 2" fill className="object-cover" />
      </div>
      <div className="col-span-4 col-start-2 row-start-2 row-span-2 bg-green-200 relative">
        <Image src="/Furniture/home3.svg" alt="Div 3" fill className="object-cover" />
      </div>
      <div className="col-span-3 col-start-3 row-start-4 row-span-2 bg-yellow-200 relative">
        <Image src="/card/image1.svg" alt="Div 4" fill className="object-cover" />
      </div>
      <div className="col-span-2 col-start-6 row-start-3 row-span-2 bg-purple-200 relative">
        <Image src="/card/image2.svg" alt="Div 5" fill className="object-cover" />
      </div>
      <div className="col-span-2 col-start-8 row-start-2 row-span-4 bg-pink-200 relative">
        <Image src="/home/home2.svg" alt="Div 6" fill className="object-cover" />
      </div>
      <div className="col-span-3 col-start-10 row-span-3 bg-indigo-200 relative">
        <Image src="/card/image4.svg" alt="Div 7" fill className="object-cover" />
      </div>
      <div className="col-span-1 col-start-10 row-start-4 row-span-3 bg-gray-200 relative">
        <Image src="/card/image3.svg" alt="Div 8" fill className="object-cover" />
      </div>
      <div className="col-span-2 col-start-11 row-start-4 row-span-2 bg-orange-200 relative">
        <Image src="/home/home1.svg" alt="Div 9" fill className="object-cover" />
      </div>
    </div>
</div>
  );
};

export default GridComponent;
