import React from 'react';
import jobportal from '../assets/job-portal.png'
const HeroSection = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center gap-30 my-10 px-6 m-5'>
      {/* Left Column - Text Content */}
      <div className='flex flex-col gap-5 text-center md:text-left md:w-1/2'>
        <span className='md:mx-0 px-4 py-2 rounded-full bg-gray-100 text-[#f80237] font-medium text-center'>Job Hunt Website</span>
        <h1 className='text-5xl font-bold text-center'>
          Explore, Apply & <br />& Land Your <span className='text-[#3872c2]'>Dream Job! 🚀</span>
        </h1>
        <p className='text-center font-semibold'>
        "An all-in-one job portal to connect job seekers with top employers."        </p>
      </div>

      {/* Right Column - Image */}
      <div className='md:w-1/2'>
        <img src={jobportal} alt='Job Hunt' className='w-100 h-auto' />
      </div>
    </div>
  );
};

export default HeroSection;
