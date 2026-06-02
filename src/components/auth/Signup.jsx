import { useState } from 'react'
import PageLayout from '../layout/PageLayout'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '@/services/allApi'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { loading } = useSelector((store) => store.auth)

  const submithandler = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
      setError('Please fill in all fields')
      return
    }
    try {
      dispatch(setLoading(true))
      const result = await registerAPI(input)
      if (result.status === 200) {
        setSuccess(`Welcome ${result.data.fullname}! Please sign in to continue.`)
        setTimeout(() => navigate('/login'), 1500)
      } else {
        setError(result.response?.data || 'Registration failed')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <PageLayout>
      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <form onSubmit={submithandler} className="glass-card w-full max-w-md space-y-4 p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join CareerHive as a job seeker or recruiter</p>
          </div>

          {error && <div className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</div>}
          {success && <div className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">{success}</div>}

          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={input.fullname} onChange={(e) => setInput({ ...input, fullname: e.target.value })} placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input value={input.phoneNumber} onChange={(e) => setInput({ ...input, phoneNumber: e.target.value })} placeholder="+1 234 567 8900" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <Label>I am a</Label>
            <div className="grid grid-cols-2 gap-3">
              {['student', 'recruiter'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setInput({ ...input, role })}
                  className={`rounded-lg border-2 px-4 py-3 text-sm font-medium capitalize transition ${
                    input.role === role ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</> : 'Create Account'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </PageLayout>
  )
}

export default Signup
