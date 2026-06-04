export const capitalizeStatus = (status) => {
  if (!status) return ''
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export const formatSalary = (salary) => {
  if (salary == null || salary === '') return '—'
  const str = String(salary).trim()
  if (str === 'NaN' || str === 'undefined') return '—'
  const num = Number(str)
  if (Number.isNaN(num)) return str.includes('LPA') ? str : `${str} LPA`
  return `${num} LPA`
}
