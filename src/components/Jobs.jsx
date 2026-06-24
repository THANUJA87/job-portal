import { useEffect, useState } from 'react'
import PageLayout from './layout/PageLayout'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/Hook/useGetAllJobs'
import { Search } from 'lucide-react'

const Jobs = () => {
  useGetAllJobs()
  const { allJobs, searchedQuery } = useSelector((store) => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    if (searchedQuery) {
      const q = searchedQuery.toLowerCase()
      setFilterJobs(
        allJobs.filter(
          (job) =>
            job.title?.toLowerCase().includes(q) ||
            job.description?.toLowerCase().includes(q) ||
            job.location?.toLowerCase().includes(q) ||
            job.jobType?.toLowerCase().includes(q)
        )
      )
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

  return (
    <PageLayout>
      <div className="page-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
          <p className="mt-1 text-muted-foreground">Find your next opportunity from {allJobs.length} openings</p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="lg:w-64 lg:shrink-0">
            <FilterCard />
          </aside>

          <div className="flex-1">
            {filterJobs.length === 0 ? (
              <div className="glass-card flex flex-col items-center py-16 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/40" />
                <h2 className="text-lg font-semibold">No jobs found</h2>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filterJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Jobs
