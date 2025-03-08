import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ServerURL from '@/services/serverurl'


const Job = ({job}) => {

   

    const daysAgefunction = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDifference = currentTime-createdAt
        return Math.floor(timeDifference/(1000*24*60*60))
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className="flex items-center justify-between">
                <p className='text-sm text-gray-500'>{daysAgefunction(job?.createdAt) == 0 ? "Today" : `${daysAgefunction(job?.createdAt)} days ago`}</p>
            </div>

            <div className='flex items-center gap-2 my-2'>
                    <Button className="p-6" variant="outline" size="icon">
                        <Avatar>
                            <AvatarImage src={`${ServerURL}/uploads/${job?.company?.logo}`}></AvatarImage>
                        </Avatar>
                    </Button>
                    <div>
                    <h1 className='font-medium text-lg'>{job?.company?.companyName}</h1>
                    <p className='text-sm text-gray-500'>{job?.company?.location}</p>
                </div>

            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p>{job?.description}</p>
                
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary }LPA</Badge>
            </div>
            <div className='flex items-center gap-20 mt-4'>
                <Button  variant="outline"><Link to={`/description/${job?._id}`}>Details</Link></Button>
                <Button  variant="outline" className="text-[#7209b7]">Apply</Button>
            </div>


        </div>

        
  
  )
}

export default Job