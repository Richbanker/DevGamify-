import { describe, it, expect } from 'vitest'
import { computeStats } from './logic'
import type { Quest } from '../../quests/model/types'

function q(over: Partial<Quest>): Quest {
  return {
    id: Math.random().toString(36).slice(2),
    title: 't',
    type: 'daily',
    category: 'react',
    difficulty: 'easy',
    rewardXp: 20,
    status: 'Done',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    ...over,
  }
}

describe('stats', () => {
  it('computes streak and monthly xp', () => {
    const today = new Date('2025-09-24T00:00:00.000Z')
    const quests: Quest[] = [
      q({ completedAt: '2025-09-24T00:00:00.000Z', rewardXp: 20 }),
      q({ completedAt: '2025-09-23T00:00:00.000Z', rewardXp: 35 }),
      q({ completedAt: '2025-09-22T00:00:00.000Z', rewardXp: 60 }),
    ]
    const s = computeStats(quests, today)
    expect(s.streakDays).toBe(3)
    expect(s.monthlyXp).toBe(115)
  })
})
