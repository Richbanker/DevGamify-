import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Quest } from './model/types'
import { useUserStore } from '../user/store'
import { useStatsStore } from '../stats/store'
import { useAchievementStore } from '../achievements/store'

type Filters = {
  category?: string
  type?: Quest['type']
  status?: Quest['status']
  from?: string
  to?: string
  q?: string
}

type QuestStore = {
  quests: Quest[]
  filters: Filters
  add: (q: Quest) => void
  update: (q: Quest) => void
  remove: (id: string) => void
  setFilters: (f: Filters) => void
  complete: (id: string) => void
  start: (id: string) => void
  skip: (id: string) => void
  plan: (id: string) => void
}

export const useQuestStore = create<QuestStore>()(
  persist(
    (set) => ({
      quests: [],
      filters: {},
      add: (q) => set((s) => ({ quests: [q, ...s.quests] })),
      update: (q) => set((s) => ({ quests: s.quests.map((x) => (x.id === q.id ? q : x)) })),
      remove: (id) => set((s) => ({ quests: s.quests.filter((x) => x.id !== id) })),
      setFilters: (f) => set(() => ({ filters: f })),
      complete: (id) => {
        const now = new Date().toISOString()
        set((s) => ({
          quests: s.quests.map((x) =>
            x.id === id ? { ...x, status: 'Done', completedAt: now } : x
          ),
        }))
        const q = useQuestStore.getState().quests.find((x) => x.id === id)
        if (q) useUserStore.getState().grantXp(q.rewardXp)
        useStatsStore.getState().recalc()
        useAchievementStore.getState().recalc()
      },
      start: (id) =>
        set((s) => ({
          quests: s.quests.map((x) => (x.id === id ? { ...x, status: 'In-Progress' } : x)),
        })),
      skip: (id) =>
        set((s) => ({
          quests: s.quests.map((x) => (x.id === id ? { ...x, status: 'Skipped' } : x)),
        })),
      plan: (id) =>
        set((s) => ({
          quests: s.quests.map((x) => (x.id === id ? { ...x, status: 'Planned' } : x)),
        })),
    }),
    { name: 'questStore' }
  )
)
