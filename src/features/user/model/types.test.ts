import { describe, it, expect } from 'vitest'
import { addXp, needXp, createDefaultUser } from './types'

describe('level and xp', () => {
  it('needXp follows formula', () => {
    expect(needXp(1)).toBe(200)
    expect(needXp(2)).toBe(350)
    expect(needXp(3)).toBe(500)
  })

  it('addXp levels up and carries remainder', () => {
    const u0 = createDefaultUser()
    const u1 = addXp(u0, 210)
    expect(u1.level).toBe(2)
    expect(u1.xp).toBe(10)
    expect(u1.nextLevelXp).toBe(350)
  })
})
