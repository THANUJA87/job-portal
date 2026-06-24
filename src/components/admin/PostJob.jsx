import React, { useState } from 'react'
import PageLayout from '../layout/PageLayout'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useNavigate } from 'react-router-dom'
import { postJobAPI } from '@/services/allApi'
import { useSelector } from 'react-redux'
import StatusBanner from '../ui/StatusBanner'

const PostJob = () => {

    
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    console.log(input);
    const {title,description,requirements,salary,location,jobType,experience,position,companyId}= input

    const { companies } = useSelector(store => store.company);
    const [loading, setLoading]= useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: 'success' });
    const navigate = useNavigate();
    

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.companyName.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if(title && description &&requirements && salary && location && jobType && experience && position && companyId){
             const token = sessionStorage.getItem('token')
             if(token){
                const reqHeader = {
                    'Content-Type':'application/json',
                     "Authorization":`Bearer ${token}`
                }
                try {
                    setLoading(true);
                    const res = await postJobAPI(input,reqHeader)

                    if(res.status == 200){
                        setFeedback({ message: 'Job posted successfully', type: 'success' });
                        setTimeout(() => navigate('/admin/jobs'), 800);
                    } else {
                        setFeedback({ message: 'Failed to post job. Please try again.', type: 'error' });
                    }
                } catch (error) {
                    console.log(error);
                    
                } finally{
                    setLoading(false);
                }
             }
        }else{
            setFeedback({ message: 'Please fill in all fields', type: 'error' });
        }
       
     
       
    }
  


   
  return (
    <PageLayout>
    <div className='page-container flex flex-1 flex-col items-center justify-center py-10'>
        <StatusBanner
          message={feedback.message}
          type={feedback.type}
          onClose={() => setFeedback({ message: '', type: 'success' })}
        />
        <form onSubmit={submitHandler} className='glass-card w-full max-w-4xl p-8'>
            <div className='grid grid-cols-2 gap-2'>
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        name="description"
                        value={input.description}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Requirements</Label>
                    <Input
                        type="text"
                        name="requirements"
                        value={input.requirements}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Salary</Label>
                    <Input
                        type="text"
                        name="salary"
                        value={input.salary}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Location</Label>
                    <Input
                        type="text"
                        name="location"
                        value={input.location}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Job Type</Label>
                    <Input
                        type="text"
                        name="jobType"
                        value={input.jobType}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Experience Level</Label>
                    <Input
                        type="text"
                        name="experience"
                        value={input.experience}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>No of Postion</Label>
                    <Input
                        type="number"
                        name="position"
                        value={input.position}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                {
                    companies.length > 0 && (
                        <Select onValueChange={selectChangeHandler} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Company" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        companies.map((company) => {
                                            return (
                                                <SelectItem value={company?.companyName?.toLowerCase()} >{company.companyName}</SelectItem>
                                            )
                                        })
                                    }

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
                }
            </div> 
            {
                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
            }
            {
                companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
            }
        </form>
    </div>
    </PageLayout>
  )
}

export default PostJob