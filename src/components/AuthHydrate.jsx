import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'

const AuthHydrate = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      try {
        dispatch(setUser(JSON.parse(storedUser)))
      } catch {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
      }
    }
  }, [dispatch])

  return children
}

export default AuthHydrate
