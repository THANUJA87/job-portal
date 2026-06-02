import { useEffect } from 'react'
import PageLayout from './layout/PageLayout'
import HeroSection from './Herosection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs '
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies')
    }
  }, [user, navigate])

  return (
    <PageLayout>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </PageLayout>
  )
}

export default Home
