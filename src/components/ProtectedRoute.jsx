import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((store) => store.auth)
  const location = useLocation()

  const storedUser = sessionStorage.getItem('user')
  const currentUser = user || (storedUser ? JSON.parse(storedUser) : null)

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
