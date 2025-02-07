import React from "react";

const Card = ({data,name}:{data:string | number, name:string}) => {
  return (
    <div className="w-[300px] border border-gray-400 h-[200px] flex flex-col justify-center pl-10  gap-5 bg-white rounded-sm">
          <h2 className="text-2xl styleData font-sans font-bold text-gray-300">{name}</h2>
          <h3 className="text-3xl styleData font-bold">{data}</h3>
          <h4 className="styleData">in the last Month</h4>
     </div>
  )
};

export default Card;
