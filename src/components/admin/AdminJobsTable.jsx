import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Delete, Edit2,MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deletejobAPI } from '@/services/allApi'


const AdminJobsTable = () => {
    const {allAdminJobs,searchJobByText} = useSelector(store=>store.job)
    const [filterJobs, setFilterJobs] = useState([]);
  

    
      useEffect(()=>{
         const filteredCompany =allAdminJobs.length >0 && allAdminJobs.filter((job)=>{
             if(!searchJobByText){
                 return true
             }
             return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.companyName.toLowerCase().includes(searchJobByText.toLowerCase())
         })
         setFilterJobs(filteredCompany)
 
      },[allAdminJobs,searchJobByText])

      const removeJob = async (id)=>{
        console.log("called");
        
        const token = sessionStorage.getItem('token')
        if(token){
            const reqHeader ={
             "Authorization":`Bearer ${token}`   
            }
            try {
            const response= await deletejobAPI(id,reqHeader)
            if(response.status == 200){
                alert("Job deleted successfully!");
                setFilterJobs(prevJobs => prevJobs.filter(job => job._id !== id));
            }
            } catch (error) {
                
            }
        }
      }


  return (
    <div>
    <Table>
        
        <TableHeader>
            <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
             {  
                filterJobs.length > 0 ? (
                filterJobs?.map((job) => ( 
                    <tr>
                        <TableCell>{job?.company?.companyName}</TableCell>
                        <TableCell>{job?.title}</TableCell>
                        <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                        <TableCell className="text-right cursor-pointer">
                            <Popover>
                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div onClick={()=>removeJob(job?._id)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                    <i class="fa-solid fa-trash"></i>
                                       <span>Delete</span>
                                    </div>
                                   
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </tr>

                ))
            ):
            <div className='text-red-600 font-bold'>Not Found</div>
            } 
        </TableBody>
    </Table>
</div>
  )
}

export default AdminJobsTable