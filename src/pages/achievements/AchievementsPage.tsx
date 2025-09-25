import { useAchievementStore } from '../../features/achievements/store'
import { Card } from '../../shared/ui/Card'

export function AchievementsPage() {
  const { achievements } = useAchievementStore()
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Ачивки</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a) => (
          <Card key={a.id} className={a.unlocked ? '' : 'opacity-60'}>
            <div className="flex items-center gap-3">
              <div className="text-3xl">{a.icon}</div>
              <div>
                <div className="font-semibold">{a.title}</div>
                <div className="text-sm text-slate-500">{a.description}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
