import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'primary', size = 'md', ...rest }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
    secondary:
      'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-900',
  }
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...rest} />
}
