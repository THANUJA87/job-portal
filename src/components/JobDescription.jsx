import { useEffect, useState } from 'react'
import PageLayout from './layout/PageLayout'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkApplicationStatusAPI,
  getSingleJobAPI,
  saveJobAPI,
  unsaveJobAPI,
} from '@/services/allApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setSingleJob } from '@/redux/jobSlice'
import { Bookmark, BookmarkCheck, Briefcase, CheckCircle2, Loader2, MapPin, IndianRupee } from 'lucide-react'
import { formatSalary } from '@/lib/format'
import ApplyJobDialog from './ApplyJobDialog'

const JobDescription = () => {
  const [isApplied, setIsApplied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [applyDialogOpen, setApplyDialogOpen] = useState(false)

  const params = useParams()
  const { singleJob } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const jobId = params.id

  const token = sessionStorage.getItem('token')
  const reqHeader = token ? { Authorization: `Bearer ${token}` } : null

  useEffect(() => {
    fetchSingleJob()
    if (token && user?.role === 'student') {
      checkStatus()
    }
  }, [jobId, user?._id])

  const fetchSingleJob = async () => {
    try {
      const res = await getSingleJobAPI(jobId, reqHeader || {})
      if (res.status === 200) {
        dispatch(setSingleJob(res.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const checkStatus = async () => {
    try {
      const res = await checkApplicationStatusAPI(jobId, reqHeader)
      if (res.status === 200) {
        setIsApplied(res.data.applied)
      }
    } catch {
      /* ignore */
    }
  }

  const requireAuth = () => {
    navigate('/login', { state: { from: `/description/${jobId}` } })
  }

  const handleApply = () => {
    if (!user) return requireAuth()
    if (user.role !== 'student') {
      setMessage('Only job seekers can apply to jobs')
      return
    }
    setApplyDialogOpen(true)
  }

  const handleApplySuccess = async () => {
    setIsApplied(true)
    setMessage('Application submitted successfully!')
  
    try {
      console.log("Calling unsave", jobId)
  
      const res = await unsaveJobAPI(jobId, reqHeader)
  
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSave = async () => {
    if (!user) return requireAuth()
    if (user.role !== 'student') return
    setLoading(true)
    try {
      if (isSaved) {
        const res = await unsaveJobAPI(jobId, reqHeader)
        if (res.status === 200) setIsSaved(false)
      } else {
        const res = await saveJobAPI(jobId, reqHeader)
        if (res.status === 200) setIsSaved(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const requirements = Array.isArray(singleJob?.requirements)
    ? singleJob.requirements
    : singleJob?.requirements?.split?.(',') || []

  return (
    <PageLayout>
      <div className="page-container py-10">
        <div className="glass-card overflow-hidden">
          <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{singleJob?.company?.companyName}</p>
                <h1 className="mt-1 text-3xl font-bold">{singleJob?.title}</h1>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1"><Briefcase className="h-3 w-3" />{singleJob?.position}</Badge>
                  <Badge variant="outline">{singleJob?.jobType}</Badge>
                  <Badge className="gap-1 bg-primary/10 text-primary"><IndianRupee className="h-3 w-3" />{formatSalary(singleJob?.salary)}</Badge>
                  <Badge variant="outline" className="gap-1"><MapPin className="h-3 w-3" />{singleJob?.location}</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                {user?.role === 'student' && (
                  <Button
                  type="button"
                  variant={isSaved ? 'secondary' : 'outline'}
                  onClick={handleSave}
                  disabled={loading || isApplied}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save Job
                    </>
                  )}
                </Button>
                )}
                <Button
                  type="button"
                  onClick={handleApply}
                  disabled={isApplied || loading}
                  className="min-w-[140px]"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isApplied ? (
                    <><CheckCircle2 className="mr-2 h-4 w-4" /> Applied</>
                  ) : 'Apply Now'}
                </Button>
              </div>
            </div>
            {message && (
              <p className={`mt-4 text-sm ${isApplied ? 'text-green-600' : 'text-muted-foreground'}`}>{message}</p>
            )}
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <section>
              <h2 className="mb-2 text-lg font-semibold">About the role</h2>
              <p className="text-muted-foreground leading-relaxed">{singleJob?.description}</p>
            </section>

            {requirements.length > 0 && (
              <section>
                <h2 className="mb-3 text-lg font-semibold">Requirements</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {req.trim()}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="font-semibold">{singleJob?.experience} years</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground">Salary</p>
                <p className="font-semibold">{formatSalary(singleJob?.salary)}</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground">Posted</p>
                <p className="font-semibold">{singleJob?.createdAt?.split('T')[0]}</p>
              </div>
            </div>

            {!user && (
              <p className="text-center text-sm text-muted-foreground">
                <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link> to apply or save this job
              </p>
            )}
          </div>
        </div>
      </div>

      <ApplyJobDialog
        open={applyDialogOpen}
        setOpen={setApplyDialogOpen}
        jobId={jobId}
        jobTitle={singleJob?.title}
        user={user}
        onSuccess={handleApplySuccess}
      />
    </PageLayout>
  )
}

export default JobDescription
