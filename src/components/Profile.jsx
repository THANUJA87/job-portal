import { useState } from 'react'
import PageLayout from './layout/PageLayout'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Mail, Pen, Phone } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import ServerURL from '@/services/serverurl'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((store) => store.auth)
  const [open, setOpen] = useState(false)

  const profilePhoto = user?.profile?.profilePhoto
    ? `${ServerURL}/uploads/${user.profile.profilePhoto}`
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname || 'User'}`

  return (
    <PageLayout>
      <div className="page-container py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="glass-card p-8 lg:col-span-1">
            <div className="flex items-start justify-between">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profilePhoto} alt="profile" />
                <AvatarFallback>{user?.fullname?.[0]}</AvatarFallback>
              </Avatar>
              <Button onClick={() => setOpen(true)} variant="outline" size="icon">
                <Pen className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 space-y-3">
              <h1 className="text-2xl font-bold">{user?.fullname}</h1>
              <p className="text-sm text-muted-foreground italic">
                {user?.bio || 'Add a bio to tell recruiters about yourself.'}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{user?.phoneNumber || 'Not provided'}</span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills?.length > 0 ? (
                  user.profile.skills.map((item, index) => (
                    <Badge key={index} variant="secondary">{item}</Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No skills added</span>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-bold">My Applications</h2>
            <AppliedJobTable />
          </div>
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </PageLayout>
  )
}

export default Profile
