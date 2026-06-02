import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { getMyApplicationsAPI } from '@/services/allApi'
import { capitalizeStatus } from '@/lib/format'
const statusColors = {
  applied: 'bg-blue-100 text-blue-800',
  reviewing: 'bg-yellow-100 text-yellow-800',
  shortlisted: 'bg-purple-100 text-purple-800',
  rejected: 'bg-red-100 text-red-800',
  selected: 'bg-green-100 text-green-800',
}

const AppliedJobTable = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    const token = sessionStorage.getItem('token')
    if (!token) return
    const reqHeader = { Authorization: `Bearer ${token}` }
    try {
      const res = await getMyApplicationsAPI(reqHeader)
      if (res.status === 200) {
        setApplications(res.data)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading applications...</p>
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
        No applications yet. Browse jobs and apply to track them here.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{app.job?.title}</TableCell>
              <TableCell>{app.job?.company?.companyName || '—'}</TableCell>
              <TableCell className="text-right">
                <Badge className={statusColors[app.status] || ''} variant="secondary">
                  {capitalizeStatus(app.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
