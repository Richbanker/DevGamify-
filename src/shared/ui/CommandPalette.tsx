import { useEffect, useMemo, useState } from 'react'
import { Dialog } from './Dialog'
import { useQuestStore } from '../../features/quests/store'

type Props = { open: boolean; onClose: () => void }

export function CommandPalette({ open, onClose }: Props) {
  const { quests } = useQuestStore()
  const [q, setQ] = useState('')

  useEffect(() => {
    if (!open) setQ('')
  }, [open])

  const items = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return quests.slice(0, 10)
    return quests
      .filter((x) => x.title.toLowerCase().includes(s) || x.category.toLowerCase().includes(s))
      .slice(0, 10)
  }, [q, quests])

  return (
    <Dialog open={open} onClose={onClose} title="Поиск по квестам (Ctrl/Cmd+K)">
      <input
        placeholder="Введите запрос..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mb-3 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800"
      />
      <ul className="max-h-64 space-y-1 overflow-auto">
        {items.map((i) => (
          <li key={i.id} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-900">
            <div className="text-sm font-medium">{i.title}</div>
            <div className="text-xs text-slate-500">
              {i.category} • {i.type} • {i.status}
            </div>
          </li>
        ))}
        {!items.length && (
          <li className="px-2 py-4 text-center text-sm text-slate-500">Ничего не найдено</li>
        )}
      </ul>
    </Dialog>
  )
}
