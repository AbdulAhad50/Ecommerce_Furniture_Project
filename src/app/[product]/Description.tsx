"use client"

import Image from 'next/image'
import style from './product.module.css'
import { useState } from 'react'
const Description = ({descriptionData, AdditionalInformationData}:{descriptionData:string, reviewData:string[],AdditionalInformationData:string | undefined}) => {


    const [description, setDescription] = useState(true)
    const [review, setReview] = useState(false)
    const [AdditionalInformation, setAdditionalInformation] = useState(false)

    function Left(){
        if(description){
            setAdditionalInformation(true)
            setReview(false)
            setDescription(false)
        }else if(AdditionalInformation){
            setReview(true)
            setDescription(false)
            setAdditionalInformation(false)
        }else if(review){
            setReview(false)
            setDescription(true)
            setAdditionalInformation(false)
        }
    }

    function Right(){
        if(description){
            setReview(true)
            setDescription(false)
            setAdditionalInformation(false)
        }else if(review){
            setAdditionalInformation(true)
            setReview(false)
            setDescription(false)
        }else if(AdditionalInformation){
            setReview(false)
            setDescription(true)
            setAdditionalInformation(false)
        }
    }
   
  return (
    <div className={`max-w-[1440px] flex flex-col items-center ${style.DescriptionTop}`}>

        
        <div className='flex items-center justify-center gap-10'>
    
                <div>
                    {
                    description &&
                        <h2 className={`${style.Description} flex gap-8`}> 
                        <button onClick={Right}>{`<`}</button>
                        Description  
                        <button onClick={Left}>{`>`}</button>
                        </h2> 
                    }
                

                   {
                   
                   AdditionalInformation && <h2 className={`${style.Description} flex gap-8`}>
                        <button onClick={Right}>{`<`}</button> 
                        Additional Information 
                        <button onClick={Left}>{`>`}</button>
                    </h2>
                    
                    }

                    {review && <h2 className={`${style.Description} flex gap-8`}>
                        <button onClick={Right}>{`<`}</button> 
                        Review 
                        <button onClick={Left}>{`>`}</button>
                    </h2>}
                </div>
       

            
        </div>

        <div className={`w-[60%] flex flex-col gap-8 mt-10`}>
                <div>
                   {
                   
                   description && 
                   
                   <div> 
                    
                    <p className={`${style.DescriptionStyle}`}>{descriptionData}</p>
                    
                    </div>
                    
                    }

                    {
                   
                   AdditionalInformationData === "" ?

                    <p className={`${style.DescriptionStyle}`}>No Any Additiional Information</p> :
                   
                   <div> 
                    

                    <p className={`${style.DescriptionStyle}`}>{AdditionalInformationData}</p>
                
                    </div>
                    
                    }

                    {
                        review && <ul>
                            <li>Good</li>
                            <li>Excellent</li>
                            <li>Very Good</li>
                            <li>Nice</li>
                        </ul>
                    }
                </div>
        </div>

        <div className='mt-8 mb-20'>
            <div className={`${style.LastItem} w-[605px] h-[348px]`}>
                <Image src={'/card/Image1.svg'} alt={''} width={300} height={300} className='w-full h-full'/>
            </div>
        </div>


    </div>
  )
}

export default Description