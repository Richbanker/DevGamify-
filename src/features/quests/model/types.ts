import { z } from 'zod'

export const questSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['daily', 'weekly', 'custom']),
  category: z.string().min(1),
  difficulty: z.enum(['easy', 'normal', 'hard']),
  rewardXp: z.number().int().min(1),
  status: z.enum(['Planned', 'In-Progress', 'Done', 'Skipped']),
  createdAt: z.string(),
  completedAt: z.string().optional(),
})

export type Quest = z.infer<typeof questSchema>

export function defaultXpByDifficulty(diff: Quest['difficulty']) {
  if (diff === 'easy') return 20
  if (diff === 'normal') return 35
  return 60
}
