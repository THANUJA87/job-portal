import { useState } from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import PageLayout from '../layout/PageLayout'
import StatusBanner from '../ui/StatusBanner'
import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import { createCompanyAPI } from '@/services/allApi'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')
  const [feedback, setFeedback] = useState({ message: '', type: 'success' })
  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      setFeedback({ message: 'Company name is required', type: 'error' })
      return
    }

    const token = sessionStorage.getItem('token')
    if (!token) {
      setFeedback({ message: 'Please log in again', type: 'error' })
      return
    }

    const reqHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const reqBody = { companyName }

    try {
      const result = await createCompanyAPI(reqBody, reqHeaders)
      if (result.status === 200) {
        dispatch(setSingleCompany(result.data.newCompany))
        const companyId = result?.data?.newCompany?._id
        setFeedback({ message: 'Company created successfully', type: 'success' })
        setTimeout(() => navigate(`/admin/companies/${companyId}`), 800)
      } else {
        const errMsg = result.response?.data?.message || result.response?.data || 'Could not create company'
        setFeedback({ message: typeof errMsg === 'string' ? errMsg : 'Could not create company', type: 'error' })
      }
    } catch {
      setFeedback({ message: 'Something went wrong. Please try again.', type: 'error' })
    }
  }

  return (
    <PageLayout>
      <div className="page-container max-w-4xl py-10">
        <StatusBanner
          message={feedback.message}
          type={feedback.type}
          onClose={() => setFeedback({ message: '', type: 'success' })}
        />
        <div className="my-10">
          <h1 className="text-2xl font-bold">Your Company Name</h1>
          <p className="text-muted-foreground">What would you like to name your company? You can change this later.</p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="my-10 flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/companies')}>Cancel</Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </PageLayout>
  )
}

export default CompanyCreate
