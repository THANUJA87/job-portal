import React, {useEffect, useState} from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleJobAPI } from '@/services/allApi'
import { useParams } from 'react-router-dom'
import { setSingleJob } from '@/redux/jobSlice'


const JobDescription = () => {
 const [isApplied,setIsApplied]=useState(false)
  const appliedStatus = localStorage.getItem("isApplied")

  const params  = useParams()
  const {singleJob} = useSelector(store=>store.job)
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const jobId = params.id
   
  useEffect(() => {
 
   fetchSingleJob()

  },[jobId,dispatch,user?._id])

  const fetchSingleJob = async () => {
    
    const token = sessionStorage.getItem('token')
    
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const res = await getSingleJobAPI(jobId,reqHeader)
        console.log(res.data);
        
        
        if (res.status == 200) {
          dispatch(setSingleJob(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }




  return (
    <div className='max-w-7xl mx-auto my-10 border p-4 shadow w-200'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl '>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position}</Badge>
            <Badge className={'text-green-700 font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className={'text-red-700 font-bold'} variant="ghost">{singleJob?.salary} LPA</Badge>

          </div>

        </div>
 
        <button disabled={isApplied} 
          className={`rounded-lg ${isApplied ? 'bg-gray-300 cursor-not-allowed p-2' : 'bg-[#8208d4] hover:bg-[#5f32ad] p-2'}`}>
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4 '>
        <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location :<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'> Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Requirements:<span className='pl-4 font-normal text-gray-800'>{singleJob?.requirements}</span></h1>
        <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} Years</span></h1>
        <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
        <h1 className='font-bold my-1'> Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>

      </div>

    </div>



    
    
    
  )
}

export default JobDescription