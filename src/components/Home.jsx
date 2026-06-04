import PageLayout from './layout/PageLayout'
import HeroSection from './Herosection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs '

const Home = () => {
  return (
    <PageLayout>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </PageLayout>
  )
}

export default Home
