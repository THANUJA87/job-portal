import React, { useEffect } from 'react'
import Header from './Header'
import HeroSection from './Herosection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs '
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/Hook/useGetAllJobs'

const Home = () => {
  useGetAllJobs();
 
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  
  return (
    <div>
        <Header/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs />
        <Footer />
    </div>
  )
}

export default Home