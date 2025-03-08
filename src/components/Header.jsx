import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import ServerURL from '@/services/serverurl'




const Header = () => {
    const navigate = useNavigate()
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const logout = () => {

        dispatch(setUser(null))
        sessionStorage.clear()
        navigate('/')
    }





    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Career<span className='text-[#029ef8]'>Hive</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role == 'recruiter' &&
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        }
                        {user && user.role == 'student' &&
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                {/* <li><Link to="/browse">Browse</Link></li> */}
                            </>


                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"> <Button variant="outline">Login</Button></Link>
                                <Link to="/register" ><Button className="bg-[#3874c2] hover:bg-[#308ea6]">Signup</Button></Link>
                            </div>

                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        {
                                            user && user.role == "recruiter" ?
                                                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDaz3OrsXoM9rXVrsr6wGsmolLOsyio3axA&s" alt="@shadcn" />
                                                :

                                                <AvatarImage src={`${ServerURL}/uploads/${user?.profile?.profilePhoto}`} alt="@shadcn" />
                                        }                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80" aria-describedby="popover-description">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                {
                                                    user && user.role == "recruiter" ?
                                                        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDaz3OrsXoM9rXVrsr6wGsmolLOsyio3axA&s" alt="@shadcn" />
                                                        :

                                                        <AvatarImage src={`${ServerURL}/uploads/${user?.profile?.profilePhoto}`} alt="@shadcn" />
                                                }
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname} </h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>

                                            {
                                                user && user.role == "recruiter" ?
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <i class="fa-solid fa-right-from-bracket"></i>
                                                        <button onClick={logout} className='btn btn-link text-red-600 ms-3 font-bold'>Logout </button>
                                                    </div>
                                                    :
                                                    <>
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <i class="fa-regular fa-user"></i>
                                                            <Button variant="link">  <Link to="/profile"> View Profile </Link> </Button>
                                                        </div>



                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <i class="fa-solid fa-right-from-bracket text-red-600"></i>
                                                            <button onClick={logout} className='btn btn-link text-red-600 ms-3 font-bold'>Logout </button>
                                                        </div>

                                                    </>

                                            }


                                        </div>

                                    </div>


                                </PopoverContent>


                            </Popover>


                        )
                    }






                </div>
            </div>

        </div>
    )
}

export default Header