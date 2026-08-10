import { useEffect, useState } from 'react'
import PageLayout from '../layout/PageLayout'
import { getRecruiterApplicationsAPI, updateApplicationStatusAPI } from '@/services/allApi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import StatusBanner from '../ui/StatusBanner'
import { capitalizeStatus } from '@/lib/format'
import ServerURL from '@/services/serverurl'
import { ExternalLink } from 'lucide-react'

const STATUSES = ['applied', 'reviewing', 'shortlisted', 'rejected', 'selected']

const RecruiterApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState({ message: '', type: 'success' })

  const token = sessionStorage.getItem('token')
  const reqHeader = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const res = await getRecruiterApplicationsAPI(reqHeader)
      if (res.status === 200) {
        setApplications(res.data)
      }
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (applicationId, status) => {
    const res = await updateApplicationStatusAPI(applicationId, status, reqHeader)
    if (res.status === 200) {
      setApplications((prev) =>
        prev.map((a) => (a._id === applicationId ? { ...a, status } : a))
      )
      setFeedback({
        message: `Status updated to ${capitalizeStatus(status)}`,
        type: 'success',
      })
    } else {
      setFeedback({ message: 'Failed to update status', type: 'error' })
    }
  }

  return (
    <PageLayout>
      <div className="page-container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="mt-1 text-muted-foreground">Review and manage candidates for your job postings</p>
        </div>

        <StatusBanner
          message={feedback.message}
          type={feedback.type}
          onClose={() => setFeedback({ message: '', type: 'success' })}
        />

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : applications.length === 0 ? (
          <div className="glass-card py-16 text-center text-muted-foreground">
            No applications received yet.
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell className="font-medium">{app.fullname || app.applicant?.fullname}</TableCell>
                    <TableCell>{app.email || app.applicant?.email}</TableCell>
                    <TableCell>{app.phoneNumber || app.applicant?.phoneNumber}</TableCell>
                    <TableCell>{app.job?.title}</TableCell>
                    <TableCell>
                      {app.resume ? (
                        <a
                          href={`${ServerURL}${app.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Select value={app.status} onValueChange={(v) => updateStatus(app._id, v)}>
                        <SelectTrigger className="w-[160px]">
                          <SelectValue>{capitalizeStatus(app.status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {capitalizeStatus(s)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default RecruiterApplications
