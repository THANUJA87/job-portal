import React, { useEffect, useState } from 'react'

import Header from '../Header'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '@/services/allApi'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const {loading} = useSelector(store=>store.auth)

    const handleLogin = async (e) =>{
        e.preventDefault()
        if(input.email && input.password){
          try {
            dispatch(setLoading(true))
            const result = await loginAPI(input)
            if(result.status == 200){
              dispatch(setUser(result.data.user))
              sessionStorage.setItem("user",JSON.stringify(result.data.user))
              sessionStorage.setItem("token",result.data.token)
              setTimeout(()=>{
              setInput({email:"",password:"",role:"" })
              navigate('/')
              dispatch(setLoading(false))
              })
             
            }else{
              if(result.response.status == 404){
                alert(result.response.data)
              }else{
                if(result.response.status == 403){
                alert(result.response.data)
              }
            }
          }
            
          } catch (err) {
            console.log(err);
            
          }finally{
            dispatch(setLoading(false))
          }
    
        }else{
          alert("please fill the form")
        }
      }
   
  return (
    <div>
    <Header/>
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form  onSubmit={handleLogin} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5 text-blue-500'>Login</h1>
            <div className='my-2'>
                <Label>Email</Label>
                <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={e=>setInput({...input,email:e.target.value})}
                    placeholder="thanuja@gmail.com"
                />
            </div>

            <div className='my-2'>
                <Label>Password</Label>
                <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={e=>setInput({...input,password:e.target.value})}
                    placeholder="******"
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
                            onChange={e=>setInput({...input,role:e.target.value})}
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
                            onChange={e=>setInput({...input,role:e.target.value})}
                            className="cursor-pointer"
                        />
                        <Label htmlFor="r2">Recruiter</Label>
                    </div>
                </RadioGroup>
            </div>
            {
                loading ? <button  className="w-full my-4 text-blue-400"> <i class="fa-solid fa-spinner"></i> Please wait </button> : <button   type="submit" className="w-full my-4 bg-blue-400 rounded p-1"><Link to={'/'}>Login</Link></button>
            }
                    <span className='text-sm'>Don't have an account? <Link to="/register" className='text-blue-600'>Signup</Link></span>
        </form>
    </div>
</div>
  
  )
}

export default Login