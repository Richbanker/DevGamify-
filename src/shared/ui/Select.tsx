import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Props = SelectHTMLAttributes<HTMLSelectElement>

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className, children, ...rest },
  ref
) {
  return (
    <select
      ref={ref}
      className={clsx(
        'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100',
        className
      )}
      {...rest}
    >
      {children}
    </select>
  )
})
