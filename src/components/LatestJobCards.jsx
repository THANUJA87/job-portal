import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { formatSalary } from '@/lib/format'

const LatestJobCards = ({ job }) => {
  return (
    <Link to={`/description/${job?._id}`}>
      <article className="glass-card group h-full p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
        <p className="text-sm font-medium text-muted-foreground">{job?.company?.companyName || 'Company'}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />{job?.location}
        </p>
        <h3 className="mt-3 text-lg font-bold group-hover:text-primary">{job?.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{job?.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{job?.position}</Badge>
          <Badge variant="outline">{job?.jobType}</Badge>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{formatSalary(job?.salary)}</Badge>
        </div>
      </article>
    </Link>
  )
}

export default LatestJobCards
