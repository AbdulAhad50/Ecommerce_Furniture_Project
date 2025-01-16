import Achievement from "../components/achievement/Achievement"
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