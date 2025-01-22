import Browse from "./component/BrowsFeatures/Browse";
import GridComponent from "./component/Furniture/Furniture";
import Hero from "./component/HeroSection/Hero";
import ShopingCard from "./component/ShopingCard/ShopingCard";




export default function Home() {

  
  return (

      <div className="max-w-[1440px] mx-[auto]">
          <Hero/>
          <Browse/>
          <ShopingCard/>
          <GridComponent/>
      </div>
  );
}
