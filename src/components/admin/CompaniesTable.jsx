import { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { deletecompanyAPI, getCompanyAPI } from '@/services/allApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllCompanies } from '@/redux/companySlice'
import ServerURL from '@/services/serverurl'
import StatusBanner from '../ui/StatusBanner'

const CompaniesTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { companies, searchCompanyByText } = useSelector((store) => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const [feedback, setFeedback] = useState({ message: '', type: 'success' })

  useEffect(() => {
    getCompany()
  }, [])

  const getCompany = async () => {
    const token = sessionStorage.getItem('token')
    if (!token) return
    const reqHeader = { Authorization: `Bearer ${token}` }
    try {
      const result = await getCompanyAPI(reqHeader)
      if (result.status === 200) {
        dispatch(setAllCompanies(result.data.company))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const filteredCompany =
      companies.length > 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true
        return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      })
    setFilterCompany(filteredCompany || [])
  }, [companies, searchCompanyByText])

  const removecompany = async (id) => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      setFeedback({ message: 'Please log in again', type: 'error' })
      return
    }
    const reqHeader = { Authorization: `Bearer ${token}` }
    try {
      const result = await deletecompanyAPI(id, reqHeader)
      if (result.status === 200) {
        setFeedback({ message: 'Company deleted successfully', type: 'success' })
        setFilterCompany((prev) => prev.filter((company) => company._id !== id))
        dispatch(setAllCompanies(companies.filter((c) => c._id !== id)))
      } else {
        setFeedback({ message: 'Failed to delete company', type: 'error' })
      }
    } catch (error) {
      console.error(error)
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
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={`${ServerURL}/uploads/${company?.logo}`} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => removecompany(company._id)}
                        className="mt-2 flex cursor-pointer items-center gap-2 text-destructive"
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
                No companies found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
