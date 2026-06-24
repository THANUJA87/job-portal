import { useEffect, useState } from 'react'
import PageLayout from '../layout/PageLayout'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import AdminJobsTable from './AdminJobsTable'
import { useDispatch } from 'react-redux'
import { setSearchJobByText, setAllAdminJobs } from '@/redux/jobSlice'
import { getAdminJobAPI } from '@/services/allApi'
import { Plus } from 'lucide-react'

const AdminJobs = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input, dispatch])

  const fetchAllAdminJobs = async () => {
    const token = sessionStorage.getItem('token')
    if (!token) return
    const reqHeaders = { Authorization: `Bearer ${token}` }
    try {
      const res = await getAdminJobAPI(reqHeaders)
      if (res.status === 200) {
        dispatch(setAllAdminJobs(res.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllAdminJobs()
  }, [])

  return (
    <PageLayout>
      <div className="page-container py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Posted Jobs</h1>
            <p className="text-muted-foreground">Manage your job listings</p>
          </div>
          <div className="flex gap-3">
            <Input className="w-48" placeholder="Filter jobs..." value={input} onChange={(e) => setInput(e.target.value)} />
            <Button onClick={() => navigate('/admin/jobs/create')} className="gap-2">
              <Plus className="h-4 w-4" /> Post Job
            </Button>
          </div>
        </div>
        <AdminJobsTable />
      </div>
    </PageLayout>
  )
}

export default AdminJobs
