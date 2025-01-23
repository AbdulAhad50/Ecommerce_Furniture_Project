import Achievement from "../component/achievement/Achievement"
import Favourite from "./Favourite"


const page = () => {

  return (
    <div className="max-w-[1440px] mx-auto">
        <Favourite/>
        <Achievement/>
    </div>
  )
}

export default page