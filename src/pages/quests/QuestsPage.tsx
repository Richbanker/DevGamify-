import { useState, useMemo } from 'react'
import { useQuestStore } from '../../features/quests/store'
import { Dialog } from '../../shared/ui/Dialog'
import { QuestForm } from '../../features/quests/ui/QuestForm'
import { Card } from '../../shared/ui/Card'
import { Button } from '../../shared/ui/Button'

export function QuestsPage() {
  const store = useQuestStore()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let items = store.quests
    if (q)
      items = items.filter(
        (x) => x.title.toLowerCase().includes(q) || x.category.toLowerCase().includes(q)
      )
    const f = store.filters
    if (f.category) items = items.filter((x) => x.category === f.category)
    if (f.type) items = items.filter((x) => x.type === f.type)
    if (f.status) items = items.filter((x) => x.status === f.status)
    if (f.from) items = items.filter((x) => new Date(x.createdAt) >= new Date(f.from!))
    if (f.to) items = items.filter((x) => new Date(x.createdAt) <= new Date(f.to!))
    return items
  }, [store.quests, store.filters, query])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Quests</h1>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск..."
            className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800"
          />
          <Button onClick={() => setOpen(true)}>Добавить</Button>
        </div>
      </div>

      <Card className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="px-4 py-2">Название</th>
              <th className="px-4 py-2">Тип</th>
              <th className="px-4 py-2">Категория</th>
              <th className="px-4 py-2">XP</th>
              <th className="px-4 py-2">Статус</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-2">{q.title}</td>
                <td className="px-4 py-2">{q.type}</td>
                <td className="px-4 py-2">{q.category}</td>
                <td className="px-4 py-2">{q.rewardXp}</td>
                <td className="px-4 py-2">{q.status}</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => store.start(q.id)}>
                      Start
                    </Button>
                    <Button variant="secondary" onClick={() => store.complete(q.id)}>
                      Done
                    </Button>
                    <Button variant="secondary" onClick={() => store.skip(q.id)}>
                      Skip
                    </Button>
                    <Button variant="secondary" onClick={() => store.remove(q.id)}>
                      Del
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td className="px-4 py-10 text-center text-slate-500" colSpan={6}>
                  Пусто. Добавьте квест.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} title="Новый квест">
        <QuestForm
          onSubmit={(v) => {
            const id = Math.random().toString(36).slice(2)
            store.add({
              id,
              title: v.title,
              description: v.description,
              type: v.type,
              category: v.category,
              difficulty: v.difficulty,
              rewardXp: v.rewardXp,
              status: 'Planned',
              createdAt: new Date().toISOString(),
            })
            setOpen(false)
          }}
        />
      </Dialog>
    </div>
  )
}
