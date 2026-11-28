import { describe, expect, it } from 'vitest'
import { addDays, formatISODate, isSameDay, rangeDays, startOfDay } from './date'

describe('calendar date helpers', () => {
  it('includes both endpoints and the leap day', () => {
    const dates = rangeDays(new Date(2024, 1, 28, 18), new Date(2024, 2, 1, 2))
    expect(dates).toEqual([
      new Date(2024, 1, 28),
      new Date(2024, 1, 29),
      new Date(2024, 2, 1),
    ])
  })

  it('returns no dates for a reversed range', () => {
    expect(rangeDays(new Date(2024, 2, 1), new Date(2024, 1, 29))).toEqual([])
  })

  it('adds calendar days without modifying the original date', () => {
    const date = new Date(2024, 11, 31, 12)
    expect(addDays(date, 1)).toEqual(new Date(2025, 0, 1, 12))
    expect(date).toEqual(new Date(2024, 11, 31, 12))
  })

  it('uses the local calendar day regardless of time', () => {
    const date = new Date(2024, 1, 29, 23, 45)
    expect(startOfDay(date)).toEqual(new Date(2024, 1, 29))
    expect(formatISODate(date)).toBe('2024-02-29T00:00:00.000Z')
    expect(isSameDay(date, new Date(2024, 1, 29, 1))).toBe(true)
    expect(isSameDay(date, new Date(2024, 2, 1))).toBe(false)
  })
})
