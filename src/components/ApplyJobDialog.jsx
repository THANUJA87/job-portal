import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { applyJobAPI } from '@/services/allApi'
import { Loader2, Upload } from 'lucide-react'

const ApplyJobDialog = ({ open, setOpen, jobId, jobTitle, user, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    coverLetter: '',
  })
  const [resume, setResume] = useState(null)
  const [useSavedResume, setUseSavedResume] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const savedResume = user?.profile?.resume

  useEffect(() => {
    if (open && user) {
      setFormData({
        fullname: user.fullname || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        coverLetter: '',
      })
      setResume(null)
      setUseSavedResume(!!savedResume)
      setError('')
    }
  }, [open, user, savedResume])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setResume(file)
      setUseSavedResume(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.fullname.trim() || !formData.email.trim() || !formData.phoneNumber.trim()) {
      setError('Please fill in all required fields')
      return
    }

    if (!resume && !useSavedResume) {
      setError('Please upload your resume or use your saved resume')
      return
    }

    const token = sessionStorage.getItem('token')
    if (!token) return

    const body = new FormData()
    body.append('fullname', formData.fullname.trim())
    body.append('email', formData.email.trim())
    body.append('phoneNumber', formData.phoneNumber.trim())
    body.append('coverLetter', formData.coverLetter.trim())
    if (resume) {
      body.append('resume', resume)
    }
    if (useSavedResume && !resume) {
      body.append('useSavedResume', 'true')
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }

    setLoading(true)
    try {
      const res = await applyJobAPI(jobId, body, reqHeader)
      if (res.status === 201 || res.status === 200) {
        setOpen(false)
        onSuccess?.()
      } else {
        setError(res.response?.data?.message || 'Could not submit application')
      }
    } catch {
      setError('Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Confirm your details and upload your resume. Your profile info is pre-filled for convenience.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="apply-fullname">Full Name *</Label>
            <Input
              id="apply-fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="apply-email">Email *</Label>
            <Input
              id="apply-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="apply-phone">Phone Number *</Label>
            <Input
              id="apply-phone"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="apply-cover">Cover Letter (optional)</Label>
            <textarea
              id="apply-cover"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={3}
              placeholder="Briefly explain why you're a good fit..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="apply-resume">Resume * (PDF or Word, max 5MB)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="apply-resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
            {savedResume && (
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={useSavedResume && !resume}
                  onChange={(e) => {
                    setUseSavedResume(e.target.checked)
                    if (e.target.checked) setResume(null)
                  }}
                />
                Use my saved resume from profile
              </label>
            )}
            {resume && (
              <p className="text-xs text-muted-foreground">Selected: {resume.name}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Application'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ApplyJobDialog
