import { useEffect, useState } from 'react'
import PageLayout from './layout/PageLayout'
import Job from './Job'
import { getSavejobAPI } from '@/services/allApi'
import { Bookmark } from 'lucide-react'

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSaved()
  }, [])

  const fetchSaved = async () => {
    const token = sessionStorage.getItem('token')
    if (!token) return
    const reqHeader = { Authorization: `Bearer ${token}` }
    try {
      const res = await getSavejobAPI(reqHeader)
      if (res.status === 200) {
        setSavedJobs(res.data)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout>
      <div className="page-container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Saved Jobs</h1>
          <p className="mt-1 text-muted-foreground">Jobs you bookmarked for later</p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading saved jobs...</p>
        ) : savedJobs.length === 0 ? (
          <div className="glass-card flex flex-col items-center py-16 text-center">
            <Bookmark className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h2 className="text-lg font-semibold">No saved jobs yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">Browse jobs and save the ones you like</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default SavedJobs
