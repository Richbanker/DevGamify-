import { beforeEach, describe, expect, it } from 'vitest'
import { useQuestStore } from './store'
import { useUserStore } from '../user/store'
import type { Quest } from './model/types'

const quest: Quest = {
  id: 'quest-1',
  title: 'Test quest',
  type: 'custom',
  category: 'learning',
  difficulty: 'easy',
  rewardXp: 20,
  status: 'Planned',
  createdAt: '2026-11-18T00:00:00.000Z',
}

describe('quest completion rewards', () => {
  beforeEach(() => {
    useQuestStore.setState({ quests: [] })
    useUserStore.getState().reset()
  })

  it('grants XP only once for repeated completion', () => {
    useQuestStore.getState().add(quest)
    useQuestStore.getState().complete(quest.id)
    expect(useUserStore.getState().user.xp).toBe(20)
    expect(useQuestStore.getState().quests[0]?.status).toBe('Done')

    useQuestStore.getState().complete(quest.id)
    expect(useUserStore.getState().user.xp).toBe(20)
  })

  it('does not grant XP for an unknown quest', () => {
    useQuestStore.getState().complete('missing')
    expect(useUserStore.getState().user.xp).toBe(0)
  })
})
