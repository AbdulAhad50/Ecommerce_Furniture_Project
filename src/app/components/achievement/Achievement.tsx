import Image from "next/image"
import style from './achieve.module.css'

const Achievement = () => {
  return (
    
    
    <div className={`flex max-w-[1440px] py-[40px] px-[10px] items-center bg-[#FAF3EA] mt-10 ${style.smallSizeWidth}`}>

        <div className={`max-w-[1440px] gap-4 grid grid-cols-4 ${style.smallScreenSize}`}>

            <div className={`flex items-center  gap-[2vw] ${style.achievementSite}`}>
                <Image src={"/achieve/ac1.svg"} alt={""} width={48} height={28}/>
                <div>
                    <h2 className={`${style.achievementTitle} ${style.textCenter}`}>High Quality</h2>
                    <span className={`${style.achievementDetail}`}>crafted from top materials</span>
                </div>
            </div>

            <div className={`"flex items-center gap-[2vw]" ${style.achievementSite}`}>
                <Image src={"/achieve/ac2.svg"} alt={""} width={48} height={28}/>
                <div>
                    <h2 className={`${style.achievementTitle}`}>Warranty Protection</h2>
                    <span className={`${style.achievementDetail}`}>Over 2 years</span>
                </div>
            </div>

            <div className={`"flex items-center gap-[2vw]" ${style.achievementSite}`}>
                <Image src={"/achieve/ac3.svg"} alt={""} width={48} height={28}/>
                <div>
                    <h2 className={`${style.achievementTitle}`}>Free Shipping</h2>
                    <span className={`${style.achievementDetail}`}>Order over 150 $</span>
                </div>
            </div>

            <div className={`"flex items-center gap-[2vw]" ${style.achievementSite}`}>
                <Image src={"/achieve/ac4.svg"} alt={""} width={48} height={28}/>
                <div>
                    <h2 className={`${style.achievementTitle}`}>24 / 7 Support</h2>
                    <span className={`${style.achievementDetail}`}>Dedicated support</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Achievement