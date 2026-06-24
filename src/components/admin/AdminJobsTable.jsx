import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { deletejobAPI } from '@/services/allApi'
import StatusBanner from '../ui/StatusBanner'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job)
  const [filterJobs, setFilterJobs] = useState([])
  const [feedback, setFeedback] = useState({ message: '', type: 'success' })

  useEffect(() => {
    const filtered =
      allAdminJobs.length > 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase())
        )
      })
    setFilterJobs(filtered || [])
  }, [allAdminJobs, searchJobByText])

  const removeJob = async (id) => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      setFeedback({ message: 'Please log in again', type: 'error' })
      return
    }
    const reqHeader = { Authorization: `Bearer ${token}` }
    try {
      const response = await deletejobAPI(id, reqHeader)
      if (response.status === 200) {
        setFeedback({ message: 'Job deleted successfully', type: 'success' })
        setFilterJobs((prev) => prev.filter((job) => job._id !== id))
      } else {
        setFeedback({ message: 'Failed to delete job', type: 'error' })
      }
    } catch {
      setFeedback({ message: 'Something went wrong', type: 'error' })
    }
  }

  return (
    <div>
      <StatusBanner
        message={feedback.message}
        type={feedback.type}
        onClose={() => setFeedback({ message: '', type: 'success' })}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.companyName}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => removeJob(job._id)}
                        className="flex cursor-pointer items-center gap-2 text-destructive"
                      >
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center font-medium text-muted-foreground">
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
