import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import ServerURL from '@/services/serverurl';
import { useSelector } from 'react-redux';

const isResume = true;
const Profile = () => {
    const { user } = useSelector(store => store.auth)
    const [open, setOpen] = useState(false);

    useEffect(() => { }, [user]);



    return (
        <div>
            <Header />
            <div className='max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 '>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={user?.profile?.profilePhoto ? `${ServerURL}/uploads/${user?.profile?.profilePhoto}` : 'https://via.placeholder.com/150'}
                                alt="profile"
                            />
                        </Avatar>

                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                      
                    </div>
                    <p className='text-sm text-gray-500 italic'>
                            {user?.bio || "No bio available."}
                        </p>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber || "NA"}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills && user?.profile?.skills.length > 0 ? (
                                user.profile.skills.map((item, index) => (
                                    <Badge key={index}>{item}</Badge>
                                ))
                            ) : (
                                <span>NA</span>
                            )
                        }


                    </div>
                </div>

            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile