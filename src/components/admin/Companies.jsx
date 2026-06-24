import { useEffect, useState } from 'react'
import PageLayout from '../layout/PageLayout'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Plus } from 'lucide-react'

const Companies = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input, dispatch])

  return (
    <PageLayout>
      <div className="page-container py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Companies</h1>
            <p className="text-muted-foreground">Manage your company profiles</p>
          </div>
          <div className="flex gap-3">
            <Input className="w-48" placeholder="Filter by name" value={input} onChange={(e) => setInput(e.target.value)} />
            <Button onClick={() => navigate('/admin/companies/create')} className="gap-2">
              <Plus className="h-4 w-4" /> New Company
            </Button>
          </div>
        </div>
        <CompaniesTable />
      </div>
    </PageLayout>
  )
}

export default Companies