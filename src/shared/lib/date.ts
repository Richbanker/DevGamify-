export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function formatISODate(date: Date) {
  return startOfDay(date).toISOString()
}

export function rangeDays(from: Date, to: Date) {
  const res: Date[] = []
  let d = startOfDay(from)
  const end = startOfDay(to)
  while (d <= end) {
    res.push(new Date(d))
    d = addDays(d, 1)
  }
  return res
}
