import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        'w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 dark:border-slate-800',
        className
      )}
      {...rest}
    />
  )
})
