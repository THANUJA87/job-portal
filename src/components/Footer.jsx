import { Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="mt-auto shrink-0 border-t border-border bg-white">
      <div className="page-container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold">CareerHive</h2>
              <p className="text-xs text-muted-foreground">© 2026 CareerHive. All rights reserved.</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/jobs" className="hover:text-primary">Jobs</Link>
            <Link to="/login" className="hover:text-primary">Login</Link>
            <Link to="/register" className="hover:text-primary">Register</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
