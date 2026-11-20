import type { Quest } from '../../quests/model/types'
import type { Stats } from './types'
import { addDays, isSameDay, startOfDay } from '../../../shared/lib/date'

export function computeStats(quests: Quest[], today: Date): Stats {
  const done = quests.filter((q) => q.status === 'Done')
  const sod = startOfDay(today)

  let streak = 0
  let cursor = sod
  // walk backwards until a day without done quest
  for (;;) {
    const has = done.some((q) => isSameDay(new Date(q.completedAt || q.createdAt), cursor))
    if (!has) break
    streak += 1
    cursor = addDays(cursor, -1)
  }

  const nextDay = addDays(sod, 1)
  const startOfWeek = addDays(sod, -6)
  const weeklyDone = done.filter((q) => {
    const completedAt = new Date(q.completedAt || q.createdAt)
    return completedAt >= startOfWeek && completedAt < nextDay
  }).length

  const startOfMonth = new Date(sod.getFullYear(), sod.getMonth(), 1)
  const monthlyXp = done
    .filter((q) => {
      const completedAt = new Date(q.completedAt || q.createdAt)
      return completedAt >= startOfMonth && completedAt < nextDay
    })
    .reduce((s, q) => s + q.rewardXp, 0)

  const categoryTotals: Record<string, number> = {}
  for (const q of done) categoryTotals[q.category] = (categoryTotals[q.category] || 0) + 1

  return { streakDays: streak, weeklyDoneCount: weeklyDone, monthlyXp, categoryTotals }
}
