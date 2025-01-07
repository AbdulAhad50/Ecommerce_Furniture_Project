import Image from "next/image";
import style from './hero.module.css'
const Hero = () => {
  return (
    <div className="relative max-[1440px] h-[100vh] bg-black mx-[auto]">
      <div className="w-full h-full">
        <Image
          src={"/Hero/Hero.jpeg"}
          alt={""}
          width={300}
          height={300}
          className="w-full h-full"
        />
      </div>

      <div className={`absolute w-[45.929vw]  top-[53px] right-[60px] h-[443px] bg-[#FFF3E3] ${style.smallSize}`}>
        <div className="flex flex-col  gap-6 pt-8 pl-[40px]">
              <span className={`${style.arrival}`}>New Arrival</span>
              <h3 className={`${style.discover}`}>Discover Our New Collection</h3>
              <p className={`${style.discoverP}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                
              </p>
              <button className={`${style.btn}`}>BUY NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
