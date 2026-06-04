import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import ServerURL from '@/services/serverurl'
import { Briefcase, Bookmark, Building2, LayoutDashboard, LogOut, User } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(setUser(null))
    sessionStorage.clear()
    navigate('/')
  }

  const profilePhoto =
    user?.role === 'recruiter'
      ? 'https://api.dicebear.com/7.x/initials/svg?seed=Recruiter'
      : user?.profile?.profilePhoto
        ? `${ServerURL}/uploads/${user.profile.profilePhoto}`
        : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname || 'User'}`

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="page-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Career<span className="text-gradient">Hive</span>
          </h1>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {user?.role === 'recruiter' && (
            <>
              <Link className="text-sm font-medium text-muted-foreground hover:text-primary" to="/">Home</Link>
              <Link className="text-sm font-medium text-muted-foreground hover:text-primary" to="/admin/companies">
                <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> Companies</span>
              </Link>
              <Link className="text-sm font-medium text-muted-foreground hover:text-primary" to="/admin/jobs">
                <span className="flex items-center gap-1.5"><LayoutDashboard className="h-4 w-4" /> Jobs</span>
              </Link>
              <Link className="text-sm font-medium text-muted-foreground hover:text-primary" to="/admin/applications">
                Applications
              </Link>
            </>
          )}
          {user?.role === 'student' && (
            <>
              <Link className="text-sm font-medium text-muted-foreground hover:text-primary" to="/">Home</Link>
              <Link className="text-sm font-medium text-muted-foreground hover:text-primary" to="/jobs">Browse Jobs</Link>
              <Link className="text-sm font-medium text-muted-foreground hover:text-primary" to="/saved">
                <span className="flex items-center gap-1.5"><Bookmark className="h-4 w-4" /> Saved</span>
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/register"><Button size="sm">Get Started</Button></Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button className="rounded-full ring-2 ring-primary/20 transition hover:ring-primary/40">
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src={profilePhoto} alt={user.fullname} />
                    <AvatarFallback>{user.fullname?.[0]}</AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4" align="end">
                <div className="flex gap-3 border-b border-border pb-3">
                  <Avatar>
                    <AvatarImage src={profilePhoto} alt={user.fullname} />
                    <AvatarFallback>{user.fullname?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.fullname}</h4>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  {user.role === 'student' && (
                    <Button variant="ghost" className="justify-start" onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" /> View Profile
                    </Button>
                  )}
                  <Button variant="ghost" className="justify-start text-destructive hover:text-destructive" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
