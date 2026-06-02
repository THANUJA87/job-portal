import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'
import ServerURL from '@/services/serverurl'
import { MapPin, Clock } from 'lucide-react'

const Job = ({ job }) => {
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime)
    const diff = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24))
    return diff === 0 ? 'Today' : `${diff}d ago`
  }

  const logo = job?.company?.logo
    ? `${ServerURL}/uploads/${job.company.logo}`
    : `https://api.dicebear.com/7.x/initials/svg?seed=${job?.company?.companyName || 'Co'}`

  return (
    <article className="glass-card group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{daysAgo(job?.createdAt)}</span>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <Avatar className="h-11 w-11">
          <AvatarImage src={logo} alt={job?.company?.companyName} />
          <AvatarFallback>{job?.company?.companyName?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold leading-tight">{job?.company?.companyName || 'Company'}</h2>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />{job?.location}
          </p>
        </div>
      </div>

      <h3 className="mb-2 text-lg font-bold group-hover:text-primary">{job?.title}</h3>
      <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">{job?.description}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="secondary">{job?.position}</Badge>
        <Badge variant="outline">{job?.jobType}</Badge>
        <Badge className="bg-accent/10 text-accent hover:bg-accent/10">{job?.salary} LPA</Badge>
      </div>

      <div className="flex gap-2">
        <Link to={`/description/${job?._id}`} className="flex-1">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
        <Link to={`/description/${job?._id}`} className="flex-1">
          <Button className="w-full">Apply</Button>
        </Link>
      </div>
    </article>
  )
}

export default Job
