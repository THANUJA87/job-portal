import React, { useEffect }  from 'react'
import LatestJobCards from './LatestJobCards';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';
import { getHomeProjectAPI } from '@/services/allApi';




const LatestJobs = () => {
 
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

  const getAllHomeproject = async ()=>{
    try {
      const result = await getHomeProjectAPI()
      if(result.status == 200){
        dispatch(setAllJobs(result.data))
      }
    } catch (err) {
      console.log(err);
      
      
    }

  }
  useEffect(()=>{
    getAllHomeproject()

  },[])
  

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#3886c2]'>Latest & Top </span> Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
      {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
           allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  )
}

export default LatestJobs 