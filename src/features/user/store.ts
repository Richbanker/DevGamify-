import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from './model/types'
import { addXp, createDefaultUser } from './model/types'

type UserStore = {
  user: User
  setNickname: (n: string) => void
  setAvatarSeed: (s: string) => void
  grantXp: (xp: number) => void
  reset: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: createDefaultUser(),
      setNickname: (n) => set((s) => ({ user: { ...s.user, nickname: n } })),
      setAvatarSeed: (v) => set((s) => ({ user: { ...s.user, avatarSeed: v } })),
      grantXp: (xp) => set((s) => ({ user: addXp(s.user, xp) })),
      reset: () => set({ user: createDefaultUser() }),
    }),
    { name: 'userStore' }
  )
)
