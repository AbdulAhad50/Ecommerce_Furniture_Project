import Browse from './components/BrowsFeatures/Browse';
import Hero from './components/HeroSection/Hero'

export default function Home() {
  return (
      <div className="max-w-[1440px] mx-[auto]">
          <Hero/>
          <Browse/>
      </div>
  );
}
