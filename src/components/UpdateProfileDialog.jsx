import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserAPI } from '@/services/allApi'
import { setUser } from '@/redux/authSlice'
// import { Loader2 } from 'lucide-react'




const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch= useDispatch()
    const {user} = useSelector(store => store.auth)
    const [formData, setFormData] = useState({
        name: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.bio || '',
        skills: user?.profile?.skills.join(", ") || '',
        profilePhoto: null
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePhoto: file });
    }

   

    
    const handleUpdateProfile = async (e)=>{
        e.preventDefault()
        const {name,email,phoneNumber,bio,skills,profilePhoto} = formData
  
        const updatedData = new FormData();
        updatedData.append('fullname',name);
        updatedData.append('email',email);
        updatedData.append('phoneNumber',phoneNumber);
        updatedData.append('bio',bio);
        updatedData.append('skills',skills);
        if (formData.profilePhoto) {
            updatedData.append('profilePhoto',profilePhoto);
        }

        const token = sessionStorage.getItem('token')
        if(token){
            const reqheader = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        try {
            const res = await updateUserAPI(updatedData,reqheader)
            if(res.status == 200){
                alert("user updated successfully!!")
                dispatch(setUser(res.data.user))
                setOpen(false)
            }
        } catch (error) {
            console.log(error);
            
        }
    
       }
       }  




    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>
                        Update Profile
                        </DialogTitle>
                        <DialogDescription>
                            Make changes to your profile information here. Click Update when done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateProfile}> 
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" >Name</Label>
                                <Input
                                    id='name'
                                    name="name"
                                    className="col-span-3"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                

                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" >Email</Label>
                                <Input
                                    id='email'
                                    name="email"
                                    className="col-span-3"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                               

                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="phoneNumber" >Phone Number</Label>
                                <Input
                                    id='phoneNumber'
                                    name="phoneNumber"
                                    className="col-span-3"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                               

                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" >Bio</Label>
                                <Input
                                    id='bio'
                                    name="bio"
                                    className="col-span-3"
                                    value={formData.bio}
                                    onChange={handleChange}
                                />
                                

                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" >Skills</Label>
                                <Input
                                    id='skills'
                                    name="skills"
                                    className="col-span-3"
                                    value={formData.skills}
                                    onChange={handleChange}
                                />
                                

                            </div>
                            <div className='flex items-center gap-10'>
                                <Label htmlFor="profilePhoto">Profile Photo</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                />
                            </div>
                       
                            
                        </div>
                        <DialogFooter>
                           <Button type="submit" className="w-full my-4">
                                Update
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog