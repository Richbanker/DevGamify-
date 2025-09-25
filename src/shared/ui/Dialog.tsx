import type { ReactNode } from 'react'
import { useEffect } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Dialog({ open, onClose, title, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <button className="absolute inset-0 bg-black/50" aria-label="Close" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-950">
        {title && <h2 className="mb-3 text-lg font-semibold">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
