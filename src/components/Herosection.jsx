import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import jobportal from '../assets/job-portal.png'

const HeroSection = () => {
  return (
    <section className="gradient-hero border-b border-border/50">
      <div className="page-container flex flex-col items-center gap-12 py-16 md:flex-row md:py-24">
        <div className="flex flex-1 flex-col gap-6 text-center md:text-left">
          <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary md:mx-0">
            <Sparkles className="h-4 w-4" />
            Your next career move starts here
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Find work you love with{' '}
            <span className="text-gradient">CareerHive</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground md:mx-0">
            Discover roles from top companies, apply in one click, and track every application from your profile dashboard.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <Link to="/jobs">
              <Button size="lg" className="gap-2 px-8">
                <Search className="h-4 w-4" />
                Browse Jobs
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="gap-2 px-8">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          <img
            src={jobportal}
            alt="Job search illustration"
            className="max-h-80 w-full max-w-md object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
