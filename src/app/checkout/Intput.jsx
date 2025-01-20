import style from './biling.module.css'
import Country from './Country'
const Intput = ({label}) => {
  return (
   <div>
      <div className='flex flex-col gap-4'>
        <label htmlFor="" className={`${style.bilingLabel}`}>{label}</label>
        <input type="text" className={`${style.Intput}`}/>
      </div>
   </div>
  )
}

export default Intput

export const Drag = ({label})=>{
    return(
      <div className='flex flex-col gap-4'>
          <label htmlFor="" className={`${style.bilingLabel}`}>{label}</label>

          <select name="" id="" className={`${style.Intput}`}>
              <Country/>
          </select>
      </div>
    )
}