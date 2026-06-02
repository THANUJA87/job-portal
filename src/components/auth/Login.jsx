import { useState } from 'react'
import PageLayout from '../layout/PageLayout'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { loginAPI } from '@/services/allApi'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [input, setInput] = useState({ email: '', password: '', role: 'student' })
  const [error, setError] = useState('')
  const { loading } = useSelector((store) => store.auth)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!input.email || !input.password || !input.role) {
      setError('Please fill in all fields')
      return
    }
    try {
      dispatch(setLoading(true))
      const result = await loginAPI(input)
      if (result.status === 200) {
        dispatch(setUser(result.data.user))
        sessionStorage.setItem('user', JSON.stringify(result.data.user))
        sessionStorage.setItem('token', result.data.token)
        const redirect = location.state?.from || (result.data.user.role === 'recruiter' ? '/admin/companies' : '/')
        navigate(redirect)
      } else {
        setError(result.response?.data || 'Login failed')
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
        <form onSubmit={handleLogin} className="glass-card w-full max-w-md space-y-5 p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to CareerHive</p>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</div>
          )}

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              placeholder="••••••••"
            />
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
                    input.role === role
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : 'Sign In'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </PageLayout>
  )
}

export default Login
