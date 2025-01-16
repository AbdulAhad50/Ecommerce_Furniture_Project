import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdWatchLater } from "react-icons/md";
import style from './contact.module.css'

const Contact = () => {
  return (
    <div className={`flex my-[30px] ${style.smallSizeScreen}`}>
        <div className={`flex flex-col mt-[20px] gap-8 w-[40%] px-[auto] pl-[100px] ${style.Street}`}>
            <div className={`flex gap-8 ${style.streetDetail}`}>
                <FaLocationDot className={`text-[28px]`}/>
                <div>
                    <h2 className={`${style.title}`}>Address</h2>
                    <p className={` ${style.titleDetail}`}>236 5th SE Avenue, New York NY10000, United States</p>
                </div>
            </div>
            <div className={`flex gap-8 ${style.streetDetail}`}>
                <FaPhone className={`text-[28px]`}/>
                <div>
                    <h2 className={`${style.title}`}>Phone</h2>
                    <p className={` ${style.titleDetail}`}>
                        Mobile: +(84) 546-6789
                    </p>
                    <br/>
                    <p className={`${style.titleDetail}`}>
                    Hotline: +(84) 456-6789
                    </p>
                </div>
            </div>
            <div className={`flex gap-8 ${style.streetDetail}`}>
                <MdWatchLater className={`text-[28px]`}/>
                <div>
                    <h2 className={`${style.title}`}>Working Time</h2>
                    <p className={`w-[200px] ${style.titleDetail}`}>Monday-Friday: 9:00 - 22:00</p>
                    <br/>
                    <p className={`w-[200px] ${style.titleDetail}`}>Saturday-Sunday: 9:00 - 21:00</p>
                </div>
            </div>
        </div>

        <div className="w-[60%]">
            <form action="" className={`gap-6 `}>
                <div className="flex flex-col gap-6">
                    <label htmlFor="" className={`${style.label}`}>Your name</label>
                    <input type="text" className={`${style.input} ${style.inputSize}` }/>
                </div>
                <div className="flex flex-col gap-6">
                    <label htmlFor="" className={`${style.label}`}>Email address</label>
                    <input type="text" className={`${style.input}`}/>
                </div>
                <div className="flex flex-col gap-6">
                    <label htmlFor="" className={`${style.label}`}>Subject</label>
                    <input type="text" className={`${style.input}`}/>
                </div>
                <div className="flex flex-col gap-6">
                    <label htmlFor="" className={`${style.label}`}>Message</label>
                    <textarea rows={4}  className={`${style.input}`}/>
                </div>

                <button className={`${style.btn}`}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Contact