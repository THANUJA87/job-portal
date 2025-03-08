import React, { useState } from 'react'
import Header from '../Header'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '@/services/allApi'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'




const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
  
  
   const {loading} = useSelector(store=>store.auth)
   
    const submithandler= async(e)=>{
        e.preventDefault()
        console.log(input);
        if(input.fullname && input.email && input.phoneNumber && input.password && input.role){
            try{
               dispatch(setLoading(true))
               const result= await registerAPI(input)
               console.log(result);
               if(result.status == 200){
                alert(`Welcome ${result.data.fullname} please login to explore our Website!!`)
                setInput({  fullname:"", email:"",phoneNumber:"", password:"",role:""})
                navigate('/login')
               }else{
                if(result.response.status ==  406){
                  alert(result.response.data)
                  setInput({ fullname:"", email:"",phoneNumber:"", password:"",role:""})
      
                }
              }

            }catch(err){
                console.log(err);
                
    
            }finally{
                dispatch(setLoading(false))
            }

        }else{
            alert("please fill the form !!")
        }
    
        
    }
 

   
  return (
    <div>
        <Header/>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submithandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 text-blue-500'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            onChange={e=> setInput({...input,fullname:e.target.value})}
                            name="fullname"
                            placeholder="thanuja"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            onChange={e=> setInput({...input,email:e.target.value})}
                            name="email"
                            placeholder="thanuja@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            onChange={e=> setInput({...input,phoneNumber:e.target.value})}
                            name="phoneNumber"
                            placeholder=""
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            onChange={e=> setInput({...input,password:e.target.value})}
                            name="password"
                            placeholder="........."
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    
                                    checked={input.role === 'student'}
                                    onChange={e=> setInput({...input,role:e.target.value})}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={e=> setInput({...input,role:e.target.value})}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                      
                    </div>
                    {
                        loading ? <button className="w-full my-4 bg-blue-400 p-1 "> <i class="fa-solid fa-spinner"></i> Please wait </button> : <button type="submit" className="w-full my-4 bg-blue-400 rounded p-1 ">Signup</button>
                    }
                    <br />
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
          </div>

    </div>
  )
}

export default Signup