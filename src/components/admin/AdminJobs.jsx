import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import Header from '../Header'
import AdminJobsTable from './AdminJobsTable'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'
import { setAllAdminJobs } from '@/redux/jobSlice'
import { getAdminJobAPI } from '@/services/allApi'

const AdminJobs = () => {
  
  const navigate = useNavigate()
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  const fetchAllAdminJobs = async () => {
    const token = sessionStorage.getItem('token')
      if(token){
          const reqHeaders ={
            "Authorization":`Bearer ${token}`
          }
          try {
            const res = await getAdminJobAPI(reqHeaders);
            if(res.status == 200){
              console.log(res.data);
              
                dispatch(setAllAdminJobs(res.data));
            }
        } catch (error) {
            console.log(error);
        }
      }
   
  }
  useEffect(()=>{
     fetchAllAdminJobs()
  },[])

  return (
    <div>
    <Header />
    <div className='max-w-6xl mx-auto my-10'>
      <div className='flex items-center justify-between my-5'>
        <Input
          className="w-fit"
          placeholder="Filter by name, role"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="bg-blue-500 hover:bg-gray-600" onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
      </div>
      <AdminJobsTable />
    </div>
  </div>
  )
}

export default AdminJobs