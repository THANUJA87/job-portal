import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilters, setJobType, setLocation, setRole } from '@/redux/jobSlice'

const filterData = [
  { key: 'location', filterType: 'Location', array: ['Kochi', 'Trivandrum', 'Bangalore', 'Hyderabad', 'Chennai'] },
  { key: 'role', filterType: 'Role', array: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Software Engineer'] },
  { key: 'jobType', filterType: 'Job Type', array: ['Full Time', 'Part Time', 'Remote', 'Hybrid'] },
]


const FilterCard = () => {
  const dispatch = useDispatch()
  const { location, role, jobType } = useSelector((store) => store.job)


  const filterValues = { location, role, jobType }

  const handleChange = (key, value) => {
    const actionMap = {
      location: setLocation,
      role: setRole,
      jobType: setJobType,
    }
    dispatch(actionMap[key](value))
  }

  const hasActiveFilters = location || role || jobType

  return (
    <div className="glass-card sticky top-20 p-5">
      <div className='flex justify-between items-center'>
      <h2 className="font-bold">Filter Jobs</h2>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => dispatch(clearFilters())}
          className="mt-2 text-sm text-primary hover:underline"
        >
          Clear all filters
        </button>
      )}
      </div>
      <hr className="my-4 border-border" />
      {filterData.map((data, index) => (
        <div key={data.key} className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{data.filterType}</h3>
          <RadioGroup
            value={filterValues[data.key]}
            onValueChange={(value) => handleChange(data.key, value)}
          >
            {data.array.map((item, idx) => {
              const itemId = `filter-${index}-${idx}`
              return (
                <div key={itemId} className="flex items-center space-x-2 py-1.5">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="cursor-pointer font-normal">{item}</Label>
                </div>
              )
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export default FilterCard
