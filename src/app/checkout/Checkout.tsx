"use client";

import Link from 'next/link';
import style from './biling.module.css';
import Intput, { Drag } from './Intput';
import { StoreData } from '../store/StoreContext';
import { useContext, useEffect, useState } from 'react';

const Checkout = () => {
    const [nameData, setNameData] = useState<string[]>([]); 

    const { placedOrder } = useContext(StoreData);

    const [items] = placedOrder || [];

    console.log("items", items); 

    const totalPrice = items?.totalPrice || 0; 
    const totalQuantity = items?.totalQuantity || [];  
    const totalName = items?.totalName || [];

    useEffect(() => {
        // Ensure that items and totalName are defined before calling the function
        if (totalName?.length > 0) {
            const truncateLongWords = (arr:string[]) => {
                return arr.map((word) => {
                    if (word.length > 10) {
                        return word.slice(0, 10) + '...';  // Truncate long words
                    }
                    return word;
                });
            };

            const dataFetchName = truncateLongWords(totalName);
            setNameData(dataFetchName);
        }
    }, [totalName]);  // Depend on totalName to update nameData whenever it changes

    console.log(nameData);  // Check the truncated names

    return (
        <div className='max-w-[1440px] flex flex-col mx-[auto]'>
            <div className={`flex mt-6 max-w-[1440px] pl-10 ${style.smallSizeScreen}`}>
                <form action="" className='w-[50%]'>
                    <h1 className={`${style.bilingStyle} text-left mb-6`}>Billing details</h1>
                    <div className='flex flex-col gap-8'>
                        <div className={`flex gap-8 ${style.Name}`}>
                            <div className='flex flex-col gap-4'>
                                <label htmlFor="" className={`${style.bilingLabel}`}>First Name</label>
                                <input type="text" className={`${style.nameLabel}`} />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <label htmlFor="" className={`${style.bilingLabel}`}>Last Name</label>
                                <input type="text" className={`${style.nameLabel}`} />
                            </div>
                        </div>

                        <Intput label={'Company Name (Optional)'} />
                        <Drag label={'Country / Region'} />
                        <Intput label={'Street address'} />
                        <Intput label={'Town / City'} />
                        <Drag label='Province' />
                        <Intput label={'ZIP code'} />
                        <Intput label={'Phone'} />
                        <Intput label={'Email address'} />
                        <Intput label={'Additional information'} />
                    </div>
                </form>

                <div className={`w-[40%] flex flex-col gap-3 ${style.customerDetail}`}>


                <div className='mt-5'>
                        <div className='flex justify-between items-center'>
                            <h1 className={`${style.placeDetailProduct}`}>Product</h1>
                            <p className={`${style.placeDetailProductSubTotal}`}>Subtotal</p>
                        </div>

                        <div className='flex flex-col justify-between'>
                            {
                                nameData?.map((elem, i) => {
                                    // Ensure totalQuantity and totalPrice are defined before using them
                                    const quantity = totalQuantity[i] || 0;  // Fallback to 0 if undefined
                                    const price = items?.singleProductPrice[i] || 0;  // Fallback to 0 if undefined

                                    return (
                                        <div className='my-4' key={i}>
                                            <h3 className={`${style.placeDetailProductName}`}>{elem} 
                                                <p className={`${style.placeDetailProductQuantity}`}>x {quantity}</p>
                                            </h3>
                                            <p className={`${style.placeDetailProductPrice}`}>{`$ ${quantity * price}`}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div className='flex justify-between items-center'>
                            <h3 className={`${style.placeDetailProductSubTotal}`}>Subtotal</h3>
                            <p className={`${style.placeDetailProductSubTotalPrice}`}>{`$ ${totalPrice.toFixed(2)}`}</p>
                        </div>

                        <div className='flex justify-between items-center'>
                            <h3 className={`${style.placeDetailProductPTotal}`}>Total</h3>
                            <p className={`${style.placeDetailProductTotalPrice}`}>
                                {`$ ${totalPrice.toFixed(2)}`}
                            </p>
                        </div>
                    </div>





                    <div className='flex flex-col gap-4'>
                        <p className={`${style.placeDetail}`}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>

                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-4 items-center'>
                                <input type="radio" id='delivery' name='delivery' />
                                <label htmlFor="delivery" className={`${style.deliverySelect}`}>Direct Bank Transfer</label>
                            </div>

                            <div className='flex gap-4 items-center'>
                                <input type="radio" id='delivery' name='delivery' />
                                <label htmlFor="delivery" className={`${style.deliverySelect}`}>Cash On Delivery</label>
                            </div>
                        </div>

                        <p className={`${style.policy}`}>
                            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link href={""} className='font-bold'>privacy policy.</Link>
                        </p>
                    </div>

                    <button className={`${style.btn}`}>Place order</button>

                    
                </div>
            </div>
        </div>
    );
};

export default Checkout;
