import { useEffect } from 'react'
import LatestJobCards from './LatestJobCards'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'
import { getHomeProjectAPI } from '@/services/allApi'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const LatestJobs = () => {
  const dispatch = useDispatch()
  const { allJobs } = useSelector((store) => store.job)

  useEffect(() => {
    const getAllHomeproject = async () => {
      try {
        const result = await getHomeProjectAPI()
        if (result.status === 200) {
          dispatch(setAllJobs(result.data))
        }
      } catch (err) {
        console.error(err)
      }
    }
    getAllHomeproject()
  }, [dispatch])

  return (
    <section className="page-container py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Latest <span className="text-gradient">Job Openings</span>
          </h2>
          <p className="mt-1 text-muted-foreground">Fresh opportunities from top companies</p>
        </div>
        <Link to="/jobs" className="hidden sm:block">
          <Button variant="outline" className="gap-2">
            View all <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {allJobs.length === 0 ? (
        <p className="text-muted-foreground">No jobs available right now. Check back soon!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  )
}

export default LatestJobs
