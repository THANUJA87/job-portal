import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import { createCompanyAPI } from '@/services/allApi'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const [companyName,setCompanyName]= useState("")
    const dispatch = useDispatch()
    console.log(companyName);
    
    const registerNewCompany = async ()=>{
        if(companyName){
            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeaders = {
                 "Content-Type":"application/json" ,
                 "Authorization":`Bearer ${token}`
                }
                const reqBody ={companyName:companyName}
               
                try {
                    const result = await createCompanyAPI(reqBody,reqHeaders)
                    console.log(result);
                    
                    if(result.status == 200){
                        console.log(result.data);
                        
                        dispatch(setSingleCompany(result.data.newCompany))
                        const companyId = result?.data?.newCompany?._id
                        console.log(companyId);
                        alert("Company created successfully")
                      
                        
                        navigate(`/admin/companies/${companyId}`)

                    }else{
                          alert(result.response.data)
                      }
                } catch (error) {
                    console.log(error);
                    
                }
            }
         
        }else{
            console.log("company name is reqired");
            
        }
       
    }
  return (
    <div>
    <Header />
    <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
        </div>

        <Label>Company Name</Label>
        <Input
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className='flex items-center gap-2 my-10'>
            <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
            <Button onClick={registerNewCompany} >Continue</Button>
        </div>
    </div>
</div>
  )
}

export default CompanyCreate