import React, { useEffect } from 'react'
import Job from './Job'
import Header from './Header'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { saveJobAPI } from '@/services/allApi'
import { Badge } from 'lucide-react'


const Browser = () => {
      const {singleJob} = useSelector(store=>store.job)
    
    const params = useParams()
    useEffect(()=>{
        saveJob()
    },[])
    const saveJob = async(req,res)=>{
        const id =params.id
        const token = sessionStorage.getItem('token')
        const reqBody = {
            title: singleJob?.title,
            description: singleJob?.description,
            requirements: singleJob?.requirements,
            salary: singleJob?.salary,
            experience: singleJob?.experience,
            location:singleJob?.location,
            jobType: singleJob?.jobType,
            position: singleJob?.position,
            companyId: singleJob?.company?._id 
        };
    
        if(token){
            const reqHeader = {
                "Authorization": `Bearer ${token}`
              }
              try {
                const res = await saveJobAPI(id,reqBody,reqHeader)
                if(res.status==200){
                    console.log("Saved Successfully..");
                }
              } catch (err) {
                console.log(err);
                
              } 
        }
    }
  return (
    <div>
    <Header />
    <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Saved Jobs </h1>
        <div className='grid grid-cols-3 gap-4'>
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.companyName}</h1>
                <p className='text-sm text-gray-500'>{job?.company?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
        </div>

    </div>
</div>
  )
}

export default Browser