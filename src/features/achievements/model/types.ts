import { z } from 'zod'

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  unlocked: z.boolean(),
  unlockedAt: z.string().optional(),
})

export type Achievement = z.infer<typeof achievementSchema>
