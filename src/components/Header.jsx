import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import ServerURL from '@/services/serverurl'
import { useState } from 'react'
import { Menu, X, Briefcase, Bookmark, Building2, LayoutDashboard, LogOut, User } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Briefcase className="h-4 w-4 text-white" />
          </div>

          <h1 className="text-lg font-bold sm:text-xl">
            Career<span className="text-primary">Hive</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {user?.role === 'recruiter' && (
            <>
              <Link className="text-sm font-medium hover:text-primary" to="/">
                Home
              </Link>

              <Link
                className="text-sm font-medium hover:text-primary"
                to="/admin/companies"
              >
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  Companies
                </span>
              </Link>

              <Link
                className="text-sm font-medium hover:text-primary"
                to="/admin/jobs"
              >
                <span className="flex items-center gap-1">
                  <LayoutDashboard className="h-4 w-4" />
                  Jobs
                </span>
              </Link>

              <Link
                className="text-sm font-medium hover:text-primary"
                to="/admin/applications"
              >
                Applications
              </Link>
            </>
          )}

          {user?.role === 'student' && (
            <>
              <Link className="text-sm font-medium hover:text-primary" to="/">
                Home
              </Link>

              <Link className="text-sm font-medium hover:text-primary" to="/jobs">
                Browse Jobs
              </Link>

              <Link className="text-sm font-medium hover:text-primary" to="/saved">
                <span className="flex items-center gap-1">
                  <Bookmark className="h-4 w-4" />
                  Saved
                </span>
              </Link>
            </>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Desktop Auth Buttons */}
          {!user && (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}

          {/* User Avatar */}
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <button className="rounded-full ring-2 ring-primary/20 hover:ring-primary/40">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profilePhoto} alt={user.fullname} />
                    <AvatarFallback>
                      {user.fullname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-4" align="end">
                <div className="flex gap-3 border-b pb-3">
                  <Avatar>
                    <AvatarImage src={profilePhoto} />
                    <AvatarFallback>
                      {user.fullname?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold">{user.fullname}</h4>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex flex-col gap-1">
                  {user.role === 'student' && (
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => navigate('/profile')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    className="justify-start text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Mobile Menu Button */}
          <button
            className="rounded-md p-1 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="flex flex-col gap-3 px-4 py-4">
            {!user && (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>

                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </>
            )}

            {user?.role === 'student' && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>

                <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>
                  Browse Jobs
                </Link>

                <Link to="/saved" onClick={() => setMobileMenuOpen(false)}>
                  Saved Jobs
                </Link>

                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
              </>
            )}

            {user?.role === 'recruiter' && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>

                <Link
                  to="/admin/companies"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Companies
                </Link>

                <Link
                  to="/admin/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Jobs
                </Link>

                <Link
                  to="/admin/applications"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Applications
                </Link>
              </>
            )}

            {user && (
              <Button
                variant="ghost"
                className="justify-start text-destructive"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
