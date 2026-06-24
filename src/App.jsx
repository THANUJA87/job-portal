import { Route, Routes } from 'react-router-dom'
import AuthHydrate from './components/AuthHydrate'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import SavedJobs from './components/SavedJobs'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import RecruiterApplications from './components/admin/RecruiterApplications'

function App() {
  return (
    <AuthHydrate>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/description/:id" element={<JobDescription />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route
          path="/saved"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <SavedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/create"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <CompanyCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/:id"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <CompanySetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/create"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <RecruiterApplications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthHydrate>
  )
}

export default App
