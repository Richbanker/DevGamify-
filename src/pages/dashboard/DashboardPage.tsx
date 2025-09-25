import { Card } from '../../shared/ui/Card'
import { useUserStore } from '../../features/user/store'
import { useStatsStore } from '../../features/stats/store'
import { Progress } from '../../shared/ui/Progress'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'
import { rangeDays } from '../../shared/lib/date'
import { useQuestStore } from '../../features/quests/store'
import { Button } from '../../shared/ui/Button'

export function DashboardPage() {
  const { user } = useUserStore()
  const statsStore = useStatsStore()
  const questStore = useQuestStore()

  const data = useMemo(() => {
    const days = rangeDays(new Date(Date.now() - 1000 * 60 * 60 * 24 * 29), new Date())
    return days.map((d) => {
      const day = d.toISOString().slice(0, 10)
      const xp = questStore.quests
        .filter((q) => q.status === 'Done' && (q.completedAt || q.createdAt).slice(0, 10) === day)
        .reduce((s, q) => s + q.rewardXp, 0)
      return { day: d.toLocaleDateString(), xp }
    })
  }, [questStore.quests])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Уровень</div>
            <div className="text-2xl font-semibold">{user.level}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">XP</div>
            <div className="text-2xl font-semibold">
              {user.xp} / {user.nextLevelXp}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Progress value={user.xp} max={user.nextLevelXp} />
        </div>
        <div className="mt-3 text-sm text-slate-500">Стрик: {statsStore.stats.streakDays} дней</div>
      </Card>

      <Card>
        <div className="text-sm text-slate-500">За неделю</div>
        <div className="text-2xl font-semibold">{statsStore.stats.weeklyDoneCount} квестов</div>
        <div className="mt-2 text-sm text-slate-500">XP за месяц: {statsStore.stats.monthlyXp}</div>
      </Card>

      <Card className="md:col-span-2">
        <div className="mb-2 text-sm text-slate-500">Активность за 30 дней</div>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <XAxis dataKey="day" hide />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="xp" stroke="#4f46e5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="md:col-span-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => {
              const id = Math.random().toString(36).slice(2)
              questStore.add({
                id,
                title: 'Ежедневный квест',
                type: 'daily',
                category: 'general',
                difficulty: 'normal',
                rewardXp: 35,
                status: 'Planned',
                createdAt: new Date().toISOString(),
              })
            }}
          >
            Ежедневный квест
          </Button>
          <Button
            onClick={() => {
              const id = Math.random().toString(36).slice(2)
              questStore.add({
                id,
                title: 'Еженедельный квест',
                type: 'weekly',
                category: 'general',
                difficulty: 'hard',
                rewardXp: 60,
                status: 'Planned',
                createdAt: new Date().toISOString(),
              })
            }}
          >
            Еженедельный квест
          </Button>
          <Button
            onClick={() => {
              const id = Math.random().toString(36).slice(2)
              questStore.add({
                id,
                title: 'Кастомный квест',
                type: 'custom',
                category: 'react',
                difficulty: 'easy',
                rewardXp: 20,
                status: 'Planned',
                createdAt: new Date().toISOString(),
              })
            }}
          >
            Добавить кастомный квест
          </Button>
        </div>
      </Card>
    </div>
  )
}
