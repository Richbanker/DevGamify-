import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  avatarSeed: z.string(),
  level: z.number().int().min(1),
  xp: z.number().int().min(0),
  nextLevelXp: z.number().int().min(1),
})

export type User = z.infer<typeof userSchema>

export function needXp(level: number) {
  return 200 + (level - 1) * 150
}

export function createDefaultUser(): User {
  const level = 1
  return {
    id: 'u1',
    nickname: 'Player',
    avatarSeed: 'Player',
    level,
    xp: 0,
    nextLevelXp: needXp(level),
  }
}

export function addXp(user: User, amount: number): User {
  let xp = user.xp + amount
  let level = user.level
  let need = needXp(level)
  while (xp >= need) {
    xp -= need
    level += 1
    need = needXp(level)
  }
  return { ...user, xp, level, nextLevelXp: need }
}
