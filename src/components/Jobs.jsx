import { useEffect, useState } from 'react'
import PageLayout from './layout/PageLayout'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/Hook/useGetAllJobs'
import { Search, SlidersHorizontal } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const locationAliases = {
  Kochi: ['kochi', 'ernakulam'],
  Trivandrum: ['trivandrum', 'tvm', 'thiruvananthapuram'],
  Bangalore: ['bangalore', 'bengaluru'],
  Hyderabad: ['hyderabad'],
  Chennai: ['chennai'],
}

const matchesLocation = (jobLocation, selectedLocation) => {
  if (!selectedLocation) return true

  const aliases =
    locationAliases[selectedLocation] || [selectedLocation.toLowerCase()]

  return aliases.some((alias) =>
    jobLocation?.toLowerCase().includes(alias)
  )
}

const matchesField = (value, filter) => {
  if (!filter) return true
  return value?.toLowerCase().includes(filter.toLowerCase())
}

const Jobs = () => {
  useGetAllJobs()

  const {
    allJobs,
    location,
    role,
    jobType,
    searchedQuery,
  } = useSelector((store) => store.job)

  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    const filtered = allJobs.filter((job) => {
      const locationMatch = matchesLocation(job.location, location)

      const roleMatch =
        matchesField(job.title, role) ||
        matchesField(job.description, role)

      const jobTypeMatch = matchesField(job.jobType, jobType)

      let textMatch = true

      if (searchedQuery) {
        const q = searchedQuery.toLowerCase()

        textMatch =
          job.title?.toLowerCase().includes(q) ||
          job.description?.toLowerCase().includes(q) ||
          job.location?.toLowerCase().includes(q) ||
          job.jobType?.toLowerCase().includes(q)
      }

      return (
        locationMatch &&
        roleMatch &&
        jobTypeMatch &&
        textMatch
      )
    })

    setFilterJobs(filtered)
  }, [allJobs, location, role, jobType, searchedQuery])

  const activeFilterCount = [location, role, jobType].filter(Boolean).length

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Browse Jobs
          </h1>

          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            {filterJobs.length} of {allJobs.length} openings
            {activeFilterCount > 0 &&
              ` · ${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''
              } active`}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4 lg:flex lg:gap-6 lg:space-y-0">
          {/* Filters */}
          <>
            {/* Mobile Filter */}
            {/* <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </button>
                </SheetTrigger>

                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <div>
                    <FilterCard />
                  </div>
                </SheetContent>
              </Sheet>
            </div> */}

            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block lg:w-64 lg:shrink-0">
              <FilterCard />
            </aside>
          </>
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <p className="text-sm text-muted-foreground">
              {filterJobs.length} Jobs Found
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] overflow-y-auto">
                  <div>
                    <FilterCard />
                  </div>
                </SheetContent>
            </Sheet>
          </div>

          {/* Jobs */}
          <div className="flex-1">
            {filterJobs.length === 0 ? (
              <div className="glass-card flex flex-col items-center rounded-xl px-4 py-12 text-center md:py-16">
                <Search className="mb-4 h-10 w-10 text-muted-foreground/40 md:h-12 md:w-12" />

                <h2 className="text-lg font-semibold">
                  No jobs found
                </h2>

                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
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