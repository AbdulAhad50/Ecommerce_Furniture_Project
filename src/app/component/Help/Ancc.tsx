"use client"
import style from './hel.module.css'
import { useState, useEffect } from "react"

const Page = () => {

  let [count, setCount] = useState(30); // Initialize the countdown state

  useEffect(() => {
    // Start the countdown timer when the component mounts
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          clearInterval(timer); // Stop the interval when count reaches 0
          return 0;
        }
        return prevCount - 1; // Decrement the count
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);

  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className={`max-w-[600px] ${style.Hel} ${count === 0 ? 'hidden' : "null"}`}>
      <h1>Dear Teacher,</h1>
      <p>
        I have deployed this website on Vercel, but many components are not showing up, and I don't know the reason behind it. However, I am working on resolving the issue. The code on my GitHub is completely correct, and you can check it there as it would be very helpful for me. It will also help you confirm whether I have done the work correctly or not.
      </p>

      <h2 className='mt-7 font-bold'>Github repository Link: https://github.com/AbdulAhad50/Ecommerce_Furniture_Project</h2>

      <h1>{count}</h1>
    </div>
  );
}

export default Page;
