import style from './browse.module.css'
import Image from "next/image"
const CardB = ({image,name}:{image:string,name:string}) => {
  return (
<div className='relative w-[300px] h-[500px] flex flex-col justify-center items-center'>
    <Image 
        src={`/Br/${image}.svg`} 
        alt={''} 
        width={0} 
        height={0} 
        sizes="100vw" 
        style={{ width: '100%', height: 'auto' }} 
        className='absolute top-0' 
    />

    <p className={`absolute bottom-0 ${style.ctn}`}>{name}</p>
</div>

  )
}

export default CardB