import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  { filterType: 'Location', array: ['Kochi', 'Trivandrum', 'Bangalore', 'Hyderabad', 'Chennai'] },
  { filterType: 'Role', array: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Software Engineer'] },
  { filterType: 'Job Type', array: ['Full-Time', 'Part-Time', 'Remote', 'Hybrid'] },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue, dispatch])

  return (
    <div className="glass-card sticky top-20 p-5">
      <h2 className="font-bold">Filter Jobs</h2>
      <hr className="my-4 border-border" />
      <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{data.filterType}</h3>
            {data.array.map((item, idx) => {
              const itemId = `filter-${index}-${idx}`
              return (
                <div key={itemId} className="flex items-center space-x-2 py-1.5">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="cursor-pointer font-normal">{item}</Label>
                </div>
              )
            })}
          </div>
        ))}
      </RadioGroup>
      {selectedValue && (
        <button
          type="button"
          onClick={() => setSelectedValue('')}
          className="mt-2 text-sm text-primary hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}

export default FilterCard
