import CardCategories from '@/components/home/card-categories';
import { Certificates } from '@/components/home/certificates';
import { FeaturedProducts } from '@/components/home/featured-products';
import { HeroSection } from '@/components/home/hero-section';
import Highlights from '@/components/home/highlights';
import WeSellSlider from '@/components/WeSell';
import YoutubeHomepage from '@/components/YoutubeHomepage';


export default function Home() {
  return (
    <div className='bg-[bg-[#F8F3D9]]'>
      <HeroSection />
      <FeaturedProducts />
      <WeSellSlider/>
      <CardCategories/>
      <YoutubeHomepage />
      <Highlights />
      <Certificates />
    </div>
  )
}