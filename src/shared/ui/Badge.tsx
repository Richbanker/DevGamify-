import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Props = HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'success' | 'warning' | 'info' }

export function Badge({ className, tone = 'neutral', ...rest }: Props) {
  const tones = {
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    info: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  }
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs',
        tones[tone],
        className
      )}
      {...rest}
    />
  )
}
