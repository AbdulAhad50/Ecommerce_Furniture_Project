import Image from "next/image"
import style from './shop.module.css'

const Filter = ({totalProduct}:{totalProduct:number}) => {
  return (
    <div className={`max-w-[1440px] mx-[auto] ${style.filter}`}>

        <div className={`flex w-full  items-center justify-around ${style.smallScreenSize}`}>
                <div className={`flex items-center gap-[3vw] ${style.smallSize}`}>
                    <Image src="/Filter/bar.svg" alt='filter' width={19.05} height={16.67}/>
                    <span className={`${style.filterHeading}`}>Filter</span>
                    <Image src="/Filter/bar2.svg" alt='bar' width={19.05} height={16.67}/>
                    <Image src="/Filter/bar3.svg" alt='bar2' width={19.05} height={16.67}/>

                    <div className={``}>
                            <h1 className={`${style.showing}`}>Showing 1-{totalProduct} of {totalProduct} result</h1>
                    </div>  
                </div>

                <div className={`flex gap-[3vw] ${style.smallSize}`}>
                    <div className={`flex items-center gap-4 ${style.smallSize}`}>
                        <span className={`${style.showingData}`}>
                            Show
                        </span>

                        <span className={`w-[48px] h-[48px] bg-white flex items-center justify-center ${style.showNumber}`} >
                            {totalProduct}
                        </span>
                    </div>

                    <div className={`flex gap-[3vw] items-center`}>
                        <span className={`${style.showingData}`}>
                            Short by
                        </span>

                        <span className={`w-[100px] h-[48px] bg-white flex items-center justify-center ${style.showNumber}`}>
                            Default
                        </span>
                    </div>
                </div>
        </div>

    </div>
  )
}

export default Filter