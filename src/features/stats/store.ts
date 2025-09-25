import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Stats } from './model/types'
import { computeStats } from './model/logic'
import { useQuestStore } from '../quests/store'

type StatsStore = {
  stats: Stats
  recalc: () => void
  reset: () => void
}

const empty: Stats = { streakDays: 0, weeklyDoneCount: 0, monthlyXp: 0, categoryTotals: {} }

export const useStatsStore = create<StatsStore>()(
  persist(
    (set) => ({
      stats: empty,
      recalc: () => set({ stats: computeStats(useQuestStore.getState().quests, new Date()) }),
      reset: () => set({ stats: empty }),
    }),
    { name: 'statsStore' }
  )
)
