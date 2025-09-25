import { describe, it, expect } from 'vitest'
import { evaluateAchievements } from './logic'
import type { Achievement } from './types'
import type { Quest } from '../../quests/model/types'

const baseAch: Achievement[] = [
  { id: 'first-steps', title: 'First Steps', description: '', icon: '', unlocked: false },
  { id: 'consistency-1', title: 'C1', description: '', icon: '', unlocked: false },
  { id: 'consistency-2', title: 'C2', description: '', icon: '', unlocked: false },
  { id: 'consistency-3', title: 'C3', description: '', icon: '', unlocked: false },
  { id: 'marathon', title: 'M', description: '', icon: '', unlocked: false },
  { id: 'focused', title: 'F', description: '', icon: '', unlocked: false },
]

function done(date: string, category = 'react'): Quest {
  return {
    id: Math.random().toString(36).slice(2),
    title: 'q',
    type: 'daily',
    category,
    difficulty: 'easy',
    rewardXp: 20,
    status: 'Done',
    createdAt: date,
    completedAt: date,
  }
}

describe('achievements', () => {
  it('unlocks first steps and consistency', () => {
    const quests = [done('2025-09-24'), done('2025-09-23'), done('2025-09-22')]
    const res = evaluateAchievements(baseAch, quests, new Date('2025-09-24'))
    const ids = res.filter((a) => a.unlocked).map((a) => a.id)
    expect(ids).toContain('first-steps')
    expect(ids).toContain('consistency-1')
  })
})
