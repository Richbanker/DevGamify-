import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-slate-200 p-4 shadow-sm dark:border-slate-800',
        className
      )}
      {...rest}
    />
  )
}
