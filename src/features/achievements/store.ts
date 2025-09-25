import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Achievement } from './model/types'
import { evaluateAchievements } from './model/logic'
import { useQuestStore } from '../quests/store'

type AchievementStore = {
  achievements: Achievement[]
  recalc: () => void
  reset: () => void
}

const initial: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete first quest',
    icon: '🥇',
    unlocked: false,
  },
  {
    id: 'consistency-1',
    title: 'Consistency I',
    description: '3-day streak',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'consistency-2',
    title: 'Consistency II',
    description: '7-day streak',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'consistency-3',
    title: 'Consistency III',
    description: '14-day streak',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'marathon',
    title: 'Marathon',
    description: '20 quests per month',
    icon: '🏃',
    unlocked: false,
  },
  {
    id: 'focused',
    title: 'Focused',
    description: '10 quests one category',
    icon: '🎯',
    unlocked: false,
  },
]

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set) => ({
      achievements: initial,
      recalc: () =>
        set((s) => ({
          achievements: evaluateAchievements(
            s.achievements,
            useQuestStore.getState().quests,
            new Date()
          ),
        })),
      reset: () => set({ achievements: initial }),
    }),
    { name: 'achievementStore' }
  )
)
