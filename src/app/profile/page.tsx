"use client"

import Image from 'next/image'
import style from './profile.module.css'
import { useState } from 'react'
const page = () => {

  let [account, setAccount] = useState(true);
  let [buy, setBuy] = useState(false);
  let [returnValue, setReturn] = useState(false);
  let [password, setPassword] = useState(false);

  let [name, setName] = useState("Jhon");
  let [lastname, setLastName] = useState("Doe");
  let [email, setEmail] = useState("testing@gmail.com");
  
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

  let nameValue;
  let lastName;
  let emailValue;
  let number

  function formSubmit(event:any){
      event.preventDefault();

      nameValue = event.target[0].value
      lastName = event.target[1].value
      emailValue = event.target[2].value
      number = event.target[3].value

      console.log(name)

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
                            <form action="#!" onSubmit={formSubmit} className={`flex flex-col gap-10 ${style.form}`}>
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
                                <form action="#!" onSubmit={formSubmit} className={`flex flex-col gap-10 ${style.passwordChangeForm}`}>
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

export default page