"use client"

import Image from 'next/image'
import style from './profile.module.css'
import { useState } from 'react'
const Page = () => {

  const [account, setAccount] = useState(true);
  const [buy, setBuy] = useState(false);
  const [returnValue, setReturn] = useState(false);
  const [password, setPassword] = useState(false);

  const [name, setName] = useState("Jhon");
  const [lastname, setLastName] = useState("Doe");
  const [email, setEmail] = useState("testing@gmail.com");
  
  function Account(){
    setAccount(true)
    setReturn(false)
    setBuy(false)
    setPassword(false)
  }

  function Buy(){
    setAccount(false)
    setReturn(false)
    setBuy(true)
    setPassword(false)
  }

  function Return(){
    setAccount(false)
    setReturn(true)
    setBuy(false)
    setPassword(false)
  }

  function Password(){
    setAccount(false)
    setReturn(false)
    setBuy(false)
    setPassword(true)
  }


  function FormSubmit(event){
      event.preventDefault();

      const nameValue = event.target[0].value
      const lastName = event.target[1].value
      const emailValue = event.target[2].value
      
      setName(nameValue);
      setLastName(lastName);
      setEmail(emailValue);

      event.target[0].value = ''
      event.target[1].value = ''
      event.target[2].value = ''
      event.target[3].value = ''
  }

  return (
    <div className={`max-w-[1440px] pt-8 mx-auto flex justify-center items-center h-[100vh] ${style.profileBack}`}>
        <div className={`w-[80vw] flex flex-col gap-6 items-center h-[550px] bg-white rounded-[20px] ${style.mainScreenSize}`}>
            <div className='w-[80%] flex items-center gap-4 h-[100px]  mt-6'>

                <div className='w-[100px] flex justify-center  h-[100px] bg-white rounded-[50%]'>
                    <Image src={'/profileImage/profileImage.png'} alt={''} width={80} height={80} className=''/>
                </div>

                <div className=' flex flex-col gap-2'>
                    <h1 className={`${style.profileName}`}>{`Name: ${name} ${lastname}`}</h1>
                    <h3 className={`${style.profileEmail}`}>{`Email: 
                    ${email}`}</h3>
                </div>



            </div>

            <div className={`w-[80%] flex items-start ${buy ? "h-auto" : "h-[60%]"}  gap-6  ${style.border}`}>
                  <div className={`flex flex-col gap-6 justify-between ${style.BtnSize}`}>
                      <button className={`${style.btn} ${account ? style.btnBorder : null}`} onClick={Account}>Account</button>

                      <button className={`${style.btn} ${buy ? style.btnBorder : null}`} onClick={Buy}>Buying Products</button>

                      <button className={`${style.btn} ${returnValue ? style.btnBorder : null}`} onClick={Return}>Return</button>

                      <button className={`${style.btn} ${password ? style.btnBorder : null}`} onClick={Password}>Password</button>
                  </div>

                  <div>
                        { account && 
                        
                        <div className={`ml-10 ${style.form}`}>
                            <form action="#!" onSubmit={FormSubmit} className={`flex flex-col gap-10 ${style.form}`}>
                                <div className={`flex flex-wrap gap-4 ${style.intStyle}`}>
                                    <input type="text" placeholder='First Name' className={`${style.inputTag}`} />

                                    <input type="text" placeholder='Last Name' className={`${style.inputTag}`}/>
                                </div>
                              <div className={`flex flex-wrap gap-4 ${style.intStyle}`}>
                                   <input type="email" placeholder='Enter Email' className={`${style.inputTag}`} />

                                    <input type="text" placeholder='Enter Number' className={`${style.inputTag}`}/>
                              </div>
                               
                               <button className={`${style.EditBtn}`}>Edit</button>
                            </form>
                        </div>
                        
                        }


                        {
                          password && 
                          
                          <div> 
                                <form action="#!" onSubmit={FormSubmit} className={`flex flex-col gap-10 ${style.passwordChangeForm}`}>
                                <div className='flex gap-4'>
                                    <input type="text" placeholder='Old Password' className={`${style.inputTag}`}/>
                                </div>
                              <div className=''>
                                    <input type="text" placeholder='New password' className={`${style.inputTag}`}/>
                              </div>
                               
                               <button className={`${style.EditBtn2}`}>Change password</button>
                            </form>
                          </div>
                        }
                  </div>
            </div>
        </div>
    </div>
  )
}

export default Page