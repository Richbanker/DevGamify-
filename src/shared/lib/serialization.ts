import { z } from 'zod'
import { userSchema } from '../../features/user/model/types'
import { questSchema } from '../../features/quests/model/types'
import { achievementSchema } from '../../features/achievements/model/types'
import { statsSchema } from '../../features/stats/model/types'

export const appDataSchema = z.object({
  user: userSchema,
  quests: z.array(questSchema),
  achievements: z.array(achievementSchema),
  stats: statsSchema,
})

export type AppData = z.infer<typeof appDataSchema>
