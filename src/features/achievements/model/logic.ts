import type { Achievement } from './types'
import type { Quest } from '../../quests/model/types'

export function evaluateAchievements(achievements: Achievement[], quests: Quest[], today: Date) {
  const done = quests.filter((q) => q.status === 'Done')
  const unlocked = new Set(achievements.filter((a) => a.unlocked).map((a) => a.id))
  const result: Achievement[] = achievements.map((a) => ({ ...a }))

  const unlock = (id: string) => {
    if (!unlocked.has(id)) {
      unlocked.add(id)
      const idx = result.findIndex((a) => a.id === id)
      if (idx >= 0) {
        const updated = {
          ...result[idx],
          unlocked: true,
          unlockedAt: today.toISOString(),
        } as Achievement
        result[idx] = updated
      }
    }
  }

  if (done.length >= 1) unlock('first-steps')

  const daysWithDone = new Set(
    done
      .map((q) => new Date(q.completedAt || q.createdAt))
      .map((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString())
  )
  if (daysWithDone.size >= 3) unlock('consistency-1')
  if (daysWithDone.size >= 7) unlock('consistency-2')
  if (daysWithDone.size >= 14) unlock('consistency-3')

  const month = today.getMonth()
  const year = today.getFullYear()
  const monthly = done.filter((q) => {
    const d = new Date(q.completedAt || q.createdAt)
    return d.getMonth() === month && d.getFullYear() === year
  })
  if (monthly.length >= 20) unlock('marathon')

  const byCat: Record<string, number> = {}
  for (const q of done) byCat[q.category] = (byCat[q.category] || 0) + 1
  if (Object.values(byCat).some((n) => n >= 10)) unlock('focused')

  return result
}
