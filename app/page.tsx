import { HeroSection } from '@/components/home/hero-section';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CategoryShowcase } from '@/components/home/category-showcase';
import WeSellSlider from '@/components/WeSell';
import YoutubeHomepage from '@/components/YoutubeHomepage';
import { Certificates } from '@/components/home/certificates';
import Highlights from '@/components/home/highlights';






export default function Home() {
  return (
    <div className='bg-[bg-[#F8F3D9]]'>
      <HeroSection />
      <FeaturedProducts />
      <WeSellSlider/>
      <YoutubeHomepage />
      <Highlights />
      <Certificates />
    </div>
  )
}