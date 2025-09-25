import { clsx } from 'clsx'

type Props = {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}

export function Switch({ checked, onChange, label }: Props) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={clsx(
        'inline-flex h-6 w-11 items-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
        checked
          ? 'bg-indigo-600 border-indigo-600'
          : 'bg-slate-200 border-slate-300 dark:bg-slate-700 dark:border-slate-600'
      )}
    >
      <span
        className={clsx(
          'ml-1 inline-block size-4 rounded-full bg-white transition',
          checked ? 'translate-x-5' : ''
        )}
      />
    </button>
  )
}
