import Browse from "./component/BrowsFeatures/Browse";
import GridComponent from "./component/Furniture/Furniture";
import Hero from "./component/HeroSection/Hero";
import ShopingCard from "./component/ShopingCard/ShopingCard";
import Help from './component/Help/Ancc'



export default function Home() {

  
  return (

      <div className="relative max-w-[1440px] mx-[auto]">
          <Hero/>
          <Browse/>
          <div className="absolute top-20 left-20">
          <Help/>

          </div>
          <ShopingCard/>
          <GridComponent/>
      </div>
  );
}
