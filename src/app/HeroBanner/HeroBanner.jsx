import Image from "next/image"
import style from './heroBanner.module.css'

const HeroBanner = ({crumbs, pageName}) => {
  // console.log(params)
  return (
    <div className='relative max-w-[1440px] h-[416px] mx-[auto]'>
        <div className='max-w-[1440px] h-[416px] '>
            <Image src={"/HeroBar/template.jpeg"} alt={""} width={300} height={300} className="w-full h-full"/>
        </div>    

        <div className={`absolute w-full h-full ${style.blurType} blur-sm top-0`}>
        </div>
        
        <div className={`absolute z-10 top-0 flex flex-col w-full h-full justify-center items-center`}>
            <h1 className={`${style.heroHeading}`}>{pageName}</h1>
            <p className={`${style.heroCrumbs}`}>Home {`>`} <span className={`${style.heroCrumbsTo}`}>{crumbs}</span></p>
        </div>
    </div>
  )
}

export default HeroBanner