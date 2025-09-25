import { z } from 'zod'

export const statsSchema = z.object({
  streakDays: z.number().int().min(0),
  weeklyDoneCount: z.number().int().min(0),
  monthlyXp: z.number().int().min(0),
  categoryTotals: z.record(z.number().int().min(0)),
})

export type Stats = z.infer<typeof statsSchema>
