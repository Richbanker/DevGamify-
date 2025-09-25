type Props = { value: number; max: number }

export function Progress({ value, max }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)))
  return (
    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
      <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}
