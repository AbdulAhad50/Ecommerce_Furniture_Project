import style from './browse.module.css'
import CardB from './CardB'

const Browse = () => {
  return (
    <div className='flex flex-col items-center mt-11'>
      <div>
        <h4 className={`text-center ${style.headingBr}`}>Browse The Range</h4>
        <p className={`${style.paragraphBr}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className={`${style.Smallsize} mt-8`}>
        <CardB image={'bed'} name={'Bedroom'} />
        <CardB image={'living'} name={'Living'} />
        <CardB image={'dining'} name={'Dining'} />
      </div>
    </div>
  )
}

export default Browse
