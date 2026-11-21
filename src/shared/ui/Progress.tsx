type Props = { value: number; max: number }

export function Progress({ value, max }: Props) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 1
  const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(safeMax, value)) : 0
  const pct = Math.round((safeValue / safeMax) * 100)
  return (
    <div
      role="progressbar"
      aria-label="Прогресс"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue}
      className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800"
    >
      <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}
