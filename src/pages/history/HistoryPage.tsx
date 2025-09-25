import { useMemo, useState } from 'react'
import { useQuestStore } from '../../features/quests/store'
import { Card } from '../../shared/ui/Card'
import { toCsv, downloadCsv } from '../../shared/lib/csv'

export function HistoryPage() {
  const { quests } = useQuestStore()
  const [range, setRange] = useState<'7' | '30' | '90'>('30')
  const filtered = useMemo(() => {
    const days = Number(range)
    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    return quests
      .filter((q) => q.status === 'Done')
      .filter((q) => new Date(q.completedAt || q.createdAt) >= from)
      .sort((a, b) => (b.completedAt || b.createdAt).localeCompare(a.completedAt || a.createdAt))
  }, [quests, range])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">История</h1>
        <div className="flex items-center gap-2">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as '7' | '30' | '90')}
            className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800"
          >
            <option value="7">7</option>
            <option value="30">30</option>
            <option value="90">90</option>
          </select>
          <button
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:hover:bg-slate-900"
            onClick={() => {
              const rows = filtered.map((q) => ({
                date: (q.completedAt || q.createdAt).slice(0, 10),
                title: q.title,
                category: q.category,
                xp: q.rewardXp,
              }))
              downloadCsv('history.csv', toCsv(rows))
            }}
          >
            Экспорт CSV
          </button>
        </div>
      </div>
      <Card className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="px-4 py-2">Дата</th>
              <th className="px-4 py-2">Название</th>
              <th className="px-4 py-2">Категория</th>
              <th className="px-4 py-2">XP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-2">{(q.completedAt || q.createdAt).slice(0, 10)}</td>
                <td className="px-4 py-2">{q.title}</td>
                <td className="px-4 py-2">{q.category}</td>
                <td className="px-4 py-2">{q.rewardXp}</td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td className="px-4 py-10 text-center text-slate-500" colSpan={4}>
                  Пусто
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
