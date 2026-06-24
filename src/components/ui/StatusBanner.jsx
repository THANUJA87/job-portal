import { useEffect } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

const StatusBanner = ({ message, type = 'success', onClose, autoHideMs = 4000 }) => {
  useEffect(() => {
    if (!message || !autoHideMs || !onClose) return
    const timer = setTimeout(onClose, autoHideMs)
    return () => clearTimeout(timer)
  }, [message, autoHideMs, onClose])

  if (!message) return null

  const isSuccess = type === 'success'

  return (
    <div
      className={`mb-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
        isSuccess
          ? 'border-green-200 bg-green-50 text-green-800'
          : 'border-red-200 bg-red-50 text-red-800'
      }`}
      role="status"
    >
      {isSuccess ? (
        <CheckCircle2 className="h-4 w-4 shrink-0" />
      ) : (
        <XCircle className="h-4 w-4 shrink-0" />
      )}
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-auto text-xs opacity-70 hover:opacity-100"
          aria-label="Dismiss"
        >
          Dismiss
        </button>
      )}
    </div>
  )
}

export default StatusBanner
