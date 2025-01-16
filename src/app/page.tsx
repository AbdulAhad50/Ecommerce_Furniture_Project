import Browse from './components/BrowsFeatures/Browse';
import GridComponent from './components/Furniture/Furniture';
import Hero from './components/HeroSection/Hero'
import ShopingCard from './components/ShopingCard/ShopingCard';



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
