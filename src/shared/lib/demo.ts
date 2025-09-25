import type { Quest } from '../../features/quests/model/types'

const cats = ['react', 'ts', 'ui', 'algo', 'docs']
const titles = ['Refactor', 'Kata', 'Doc update', 'UI polish', 'Fix bug', 'Read article']

export function generateDemoQuests(): Quest[] {
  const res: Quest[] = []
  const now = Date.now()
  for (let i = 0; i < 120; i++) {
    const dayOffset = Math.floor(Math.random() * 60)
    const date = new Date(now - dayOffset * 24 * 60 * 60 * 1000)
    const type = (['daily', 'weekly', 'custom'] as const)[Math.floor(Math.random() * 3)] as
      | 'daily'
      | 'weekly'
      | 'custom'
    const difficulty = (['easy', 'normal', 'hard'] as const)[Math.floor(Math.random() * 3)] as
      | 'easy'
      | 'normal'
      | 'hard'
    const category = cats[Math.floor(Math.random() * cats.length)] as string
    const title = titles[Math.floor(Math.random() * titles.length)] + ' ' + category
    const rewardXp = difficulty === 'easy' ? 20 : difficulty === 'normal' ? 35 : 60
    const status = Math.random() > 0.2 ? 'Done' : 'Planned'
    const createdAt = date.toISOString()
    const completedAt = status === 'Done' ? createdAt : undefined
    res.push({
      id: Math.random().toString(36).slice(2),
      title,
      type,
      category,
      difficulty,
      rewardXp,
      status,
      createdAt,
      completedAt,
    })
  }
  return res
}
