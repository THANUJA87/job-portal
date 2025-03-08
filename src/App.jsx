import { useState } from 'react'

import Footer from './components/Footer'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Jobs from './components/Jobs'
import Browser from './components/Browser'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
 
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/jobs' element={<Jobs/>}/>
      <Route path='/browse/:id' element={<Browser/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/description/:id' element={<JobDescription/>}/>

      {/* admin */}

      <Route path='/admin/companies' element={<Companies/>}/>
      <Route path='/admin/companies/create' element={<CompanyCreate/>}/>
      <Route path='/admin/companies/:id' element={<CompanySetup/>}/>
      <Route path='/admin/jobs' element={<AdminJobs/>}/>
      <Route path='/admin/jobs/create' element={<PostJob/>}/>




    </Routes>


    </>
  )
}

export default App
